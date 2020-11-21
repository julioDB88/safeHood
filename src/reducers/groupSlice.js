
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

import storage from '@react-native-firebase/storage';
import { fetchPetitions, groupRemovedP } from './joinRequestsSlice';
import { fetchAlerts, groupRemovedA } from './alertsSlice';
import { fetchMembers,groupRemovedM } from './membersSlice';

export const setGroupPhoto = createAsyncThunk('group/updatePhoto',async (data,store)=>{
    let avatarsGRef= storage().ref(`groupAvatars/${data.groupId}/profile.jpg`);
    let list = await avatarsGRef.list()

    if(list.items.length > 0){
        list.items[0].delete()


    }
    await avatarsGRef.putFile(data.resp.path).on('state_changed', async (snap)=>{

        if(snap.state=='success') {
            await  snap.ref.getDownloadURL().then(url=>{
                
            
                let groupRef=database().ref(`groups/${data.groupId}`)
                groupRef.update({photo:url})
                
                store.dispatch(setGPhoto(url))
            })
        }; 
    })
  
})

export const removeAllGroup = createAsyncThunk('group/removeAll',async (data,{dispatch})=>{
 
    let groupRef = await database().ref(`/groups/${data.groupId}/users`)
    await storage().ref(`/groupAlerts/${data.groupId}`).listAll().then(item=> item.items.forEach(item=>item.delete()))
    await storage().ref(`/groupAvatars/${data.groupId}`).list().then(item=> item.items.forEach(item=>item.delete()));
    //aviso a los usuarios y les elimino el groupId de su database
    await groupRef.once('value').then(snap=>{
        
        const users = Object.keys(snap.val())
        users.forEach(async user=>{
          

         
            if(user != data.userId){
                let userRef= await database().ref(`/users/${user}`)
                userRef.child('groupId').remove()
                
                userRef.child('notifications').set({msg:'El grupo ha sido borrado'})
            }
        })
    })
    //elimino listener + el grupo
    groupRef.parent.off()
    groupRef.parent.remove()
    //elimino el groupId del usuario
    await  database().ref(`/users/${data.userId}/groupId`).remove()


    //limpio los states de cada slice
    dispatch(clearGroupData())
    dispatch(groupRemovedA());
    dispatch(groupRemovedP());
    dispatch(groupRemovedM());
  

})
export const removeUserFromGroup = createAsyncThunk('group/removeUserFromGroup',async (data,{dispatch})=>{

    //eliminia al usuario (no a un miembro cualquiera del grupo)
    await database().ref(`/groups/${data.groupId}/users/${data.userId}`).remove()
    //elimino listeners
    await database().ref(`/groups/${data.groupId}`).off()
    await database().ref(`/users/${data.userId}/groupId`).remove()
    //limpio los states de cada slice
    dispatch(clearGroupData())
    dispatch(groupRemovedA());
    dispatch(groupRemovedP());
    dispatch(groupRemovedM());
})

export const createNewGroup = createAsyncThunk('group/createGroup', async (data,{dispatch})=>{

    let newGroupKey= await database().ref('/groups').push().key
    await  database().ref(`/groups/${newGroupKey}`).set(data.group)
    await database().ref(`/users/${data.uid}/groupId`).set(`${newGroupKey}`); 
    dispatch(fetchUserGroup({groupId:newGroupKey,userId:data.uid}))

    
})


export const setNewAdmin = createAsyncThunk('group/setNewAdmin',async (data)=>{

    database().ref(`/groups/${data.groupId}/users/${data.newAdmin}`).update({role:'admin'})
    database().ref(`/groups/${data.groupId}/users/${data.user}`).update({role:'user'})
    return true

});



export const fetchUserGroup = createAsyncThunk('group/fetchGroupData', async (data,{getState, dispatch})=>{

if(!getState().group.fetched){
    let groupRef = await database().ref(`groups/${data.groupId}`);
    let groupContent = groupRef.once('value').then(async snap=>{
                            let groupData={}
                            if(snap.exists()){
                                dispatch(fetchPetitions(data.groupId))
                                dispatch(fetchAlerts(data.groupId))
                                dispatch(fetchMembers(data.groupId))
                                groupData.isAdmin= snap.val().users[data.userId].role=='admin' ? true:false   
                                groupData.exists=true
                                groupData.zCode=snap.val().zCode
                                groupData.name= snap.val().name
                                groupData.photo= snap.val().photo
                                return groupData;

                            }else{
                                dispatch(clearGroupData())
                                dispatch(setGroupAlert('El grupo ha sido eliminado'))
                                database().ref(`users/${data.userId}/groupId`).remove()
                            }
                            
                        })
   
        
        let payload ={
            id: data.groupId,
            exists: (await groupContent).exists,
            isAdmin: (await groupContent).isAdmin,
            name: (await groupContent).name,
            zCode: (await groupContent).zCode,
            photo:(await groupContent).photo
        }
       
        return payload;

}

})

const initialState={
        id:null,
        isAdmin:null,
        exists:false,
        name:null,
        fetched:false,
        zCode:null,
        msg:false,
        photo:null,
    };

export const slice = createSlice({
    name:'group',
    initialState:initialState,
    reducers:{
        switchRole:(state,action)=>{state.isAdmin = !state.isAdmin},
        setGPhoto:(state,action)=>{state.photo = action.payload},
        setNewGroupData:(state,action)=>{
            state.id=action.payload.id
            state.zCode=action.payload.zCode
            state.isAdmin=true,
            state.exists=true,
            state.name=action.payload.name
            state.fetched=true
        },
        clearGroupData:(state,action)=>{
            
            state.id=null,
            state.isAdmin=null,
            state.exists=false,
            state.name=null,
            state.fetched=false,
            state.zCode=null,
            state.msg=false
        },
        setGroupAlert:(state,action)=>{state.msg=action.payload},
        clearGroupAlert:(state,action)=>{state.msg=false},
     
    },
    extraReducers:{
        [fetchUserGroup.fulfilled]:(state,action)=>{

                state.zCode=action.payload.zCode
                state.fetched=true
                state.isAdmin = action.payload.isAdmin
                state.exists = action.payload.exists
                state.name = action.payload.name
                state.id= action.payload.id,
                state.photo= action.payload.photo
        }, 
      
        [fetchUserGroup.rejected]:(state,action)=>{
        
          
        },
        [setGroupPhoto.fulfilled]:(state,action)=>{
        console.log('group foto full');
          
        },
        [setGroupPhoto.rejected]:(state,action)=>{
            console.log(action);
              
            },
        [setNewAdmin.rejected]:(state,action)=>{
        
        
        },
        [createNewGroup.fulfilled]:(state,action)=>{
            
         },
        [createNewGroup.rejected]:(state,action)=>{
           
         },
        [removeAllGroup.fulfilled]:(state,action)=>{
            state.id=null,
            state.isAdmin=null,
            state.exists=false,
            state.name=null,
            state.fetched=false,
            state.zCode=null,
            state.msg=false
        },
        [removeAllGroup.rejected]:(state,action)=>{
           console.log(action);
         },
         [removeUserFromGroup.fulfilled]:(state,action)=>{
            state.id=null,
            state.isAdmin=null,
            state.exists=false,
            state.name=null,
            state.fetched=false,
            state.zCode=null,
            state.msg=false
        },
        [removeUserFromGroup.rejected]:(state,action)=>{
          
         },

  
    }
})

export const {switchRole,setNewGroupData,clearGroupData,setGroupAlert,clearGroupAlert,setGPhoto} = slice.actions
export default slice.reducer;