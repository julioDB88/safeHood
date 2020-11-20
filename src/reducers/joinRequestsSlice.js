import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';


export const fetchPetitions = createAsyncThunk('petitions/fetchall',async (groupId,{dispatch})=>{
    let petitionsRef= await database().ref(`/groups/${groupId}/joinRequests`)
    petitionsRef.on('value',snap=>{
        let petitionsArray =[];
        snap.forEach((child) => {petitionsArray.push({...child.val(), id: child.key})});  
        dispatch(setPetitions(petitionsArray)) 
    })
})


export const denyPetition= createAsyncThunk('petitions/deny',async data=>{

    await  database().ref(`/groups/${data.groupId}/joinRequests/${data.userId}`).remove()
    await database().ref(`/users/${data.userId}/notifications`).set({msg:`Tu peticion para unirte al grupo ${data.groupName} ha sido rechazada`})

})

export const acceptPetition= createAsyncThunk('petitions/accept',async (data,{dispatch})=>{
    let joiningUserRef= await database().ref(`/users/${data.user.uid}`).once('value');
    let hasGroup= joiningUserRef.hasChild('groupId')
    let groupUsersRef = await database().ref(`/groups/${data.groupId}/users/${data.user.uid}`);
    let message ;
    if (!hasGroup){
        //añado a usuarios
        groupUsersRef.set({name:data.user.name,photo:data.user.photo,role:'user'})
        // Añado uid del group al usuario
        await database().ref(`/users/${data.user.uid}`).update({groupId:data.groupId})
         message = {status:'ok'}
        
    }else{
     message = {status:'error'}
    }
    // //elimino la solicitud
     groupUsersRef.parent.parent.child('joinRequests').child(`${data.user.uid}`).remove()
     
     return message


})



const initialState={
    petitions:[],
    fetched:false,
    status:'idel',
    setted:false,
 }
export const slice = createSlice({
    name:'joinRequests',
    initialState:initialState,
    reducers:{
        setPetitions:(state,action)=>{
          state.petitions=action.payload
          state.setted=true;
        },
        removePetition:(state,action)=>{
            let request= state.joinRequests.find(elem=>elem.uid==action.payload)
            return state.joinRequests = state.joinRequests.splice(request,1)
        },
        groupRemovedP:(state,action)=>{
            state.petitions=[],
            state.fetched=false,
            state.setted=false
        }

    },
    extraReducers:{
    
        [acceptPetition.fulfilled]:(state,action)=>{
        
        
        },    
        [acceptPetition.rejected]:(state,action)=>{
        
           
        },    
        [denyPetition.fulfilled]:(state,action)=>{
        
            
        },    
        [denyPetition.rejected]:(state,action)=>{
        
        
        },
        [fetchPetitions.fulfilled]:(state,action)=>{
            state.fetched=true
            
           
        },
      
        [fetchPetitions.rejected]:(state,action)=>{
        
           
        },
  
    }
})

export const {setPetitions,groupRemovedP} = slice.actions
export default slice.reducer;