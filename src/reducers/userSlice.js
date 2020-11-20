
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { fetchUserGroup,clearGroupData } from './groupSlice';


export const updateUserPhoto = createAsyncThunk('user/updatePhoto',async (data,store)=>{
        let avatarsRef= storage().ref(`avatars/${data.userId}/profile.jpg`);
        let list = await avatarsRef.list()
    
        if(list.items.length > 0){
            list.items[0].delete()
        }
        await avatarsRef.putFile(data.resp.path).on('state_changed', async (snap)=>{
            if(snap.state=='success') {
                await  snap.ref.getDownloadURL().then(url=>{
                    
                    auth().currentUser.updateProfile({photoURL:url});
                    let userRef=database().ref(`users/${data.userId}`)
                    userRef.update({photo:url})
                    if(data.groupId){
                        database().ref(`/groups/${data.groupId}/users/${data.userId}`).update({photo:url}) 
                    }
                    store.dispatch(setPhoto(url))
                })
            }; 
        })
      
})

export const updateDisplayName = createAsyncThunk('user/updateName',async (data,store)=>{
        auth().currentUser.updateProfile({displayName:data.name})
        database().ref(`/users/${data.userId}`).update({name:data.name})
       
        if(data.groupId){
            database().ref(`/groups/${data.groupId}/users/${data.userId}`).update({name:data.name});
        }
     
        return data.name
})

export const checkUserisverified = createAsyncThunk('user/checkVerified',async ()=>{
    await auth().currentUser.reload()
    let user= await auth().currentUser;
    return user.emailVerified;
})

export const fetchUser =  createAsyncThunk('user/fetch', async (_,{getState,dispatch})=>{

    if(!getState().user.fetched){
        let data= auth().currentUser;
        let userData ={uid:data.uid,photo: data.photoURL,verified:data.emailVerified,name:data.displayName}
        let userRef = await database().ref(`/users/${data.uid}`)
 
        //listen for changes
        userRef.on('child_removed',snap=>{
          if(snap.key=='groupId'){dispatch(clearGroupData())}
     
        })
        userRef.on('child_added',snap=> {
            if(snap.key=='notifications'){dispatch(setAlert(snap.val().msg))}//
            if(snap.key=='groupId' && !getState().group.fetched){
                let fetchGroupData={userId:data.uid,groupId:snap.val()}
                dispatch(fetchUserGroup(fetchGroupData))  
            }

        })        
        let hasGroup= (await userRef.child('groupId').once('value')).exists()

        userData.hasGroup= hasGroup;
        return userData;   

    }
           
                 
});

export const clearUserAlert = createAsyncThunk('auth/clearAlert',async(uid,{dispatch})=>{
   await database().ref(`/users/${uid}/notifications`).remove()
   dispatch(clearUAlert())
})

const slice = createSlice({
    name:'user',
    initialState:{
        uid:null,
        photo:null,
        name:null,
        verified:null,
        fetched:false,
        msg:false,
        hasGroup:false,
    },
    reducers:{
        setAlert:(state,action)=>{
     
            if(state.msg==false){
                state.msg=action.payload
            }
            
        },
        clearUAlert:(state,action)=>{state.msg=false},
        setUserName:(state,action)=>{state.name=action.payload},
        setVerified:(state,action)=>{state.verified=true},
        setPhoto:(state,action)=>{state.photo=action.payload},
    },
    extraReducers:{
        [fetchUser.fulfilled]:(state,action)=>{
          if(action.payload){
            state.fetched=true
            state.name=action.payload.name
            state.uid=action.payload.uid
            state.photo= action.payload.photo
            state.status= 'success';
            state.verified = action.payload.verified
            state.hasGroup = action.payload.hasGroup
          }
        },   
       
        [clearUserAlert.fulfilled]:(state,action)=>{
            state.msg=false
        },
        [updateDisplayName.fulfilled]:(state,action)=>{
            state.name= action.payload;
        },  
 
        [checkUserisverified.fulfilled]:(state,action)=>{
           
            state.verified= action.payload;
        },
    }
})

// Destructure and export the plain action creators
export const {setUserName,setPhoto,setVerified,setAlert,clearUAlert} = slice.actions

// Define a thunk that dispatches those action creators


export default slice.reducer;