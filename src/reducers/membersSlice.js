
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';


export const fetchMembers = createAsyncThunk('members/fetchAll',async (groupId,{dispatch})=>{
    
     await database().ref(`/groups/${groupId}/users`).on('value',snap=>{
         let membersArray=[]
          snap.forEach((child) => {membersArray.push({ ...child.val(),uid: child.key})});
          dispatch(setMembers(membersArray))
           
    })
})

export const removeMember =createAsyncThunk('members/remove', async ({member,group})=>{

    //elimino al usuario

   await database().ref(`/groups/${group}/users/${member}`).remove()
   
   //elimino sus mensajes del grupo
   let alertsRef= await database().ref(`/groups/${group}/alerts`)
    await alertsRef.orderByChild('uid').equalTo(`${member}`).once('value')
   .then(snap=>{
       if(snap.exists()){
        const keys = Object.keys(snap.val())
        keys.forEach(key=>{
            alertsRef.child(key).remove()
        })
       }
      
    })
    //elimino grupo en usuario y añado una noti
    let userRef= await database().ref(`/users/${member}`)
    
   userRef.child('groupId').remove()  
   userRef.child('notifications').set({msg:'Te han borrado del grupo'})     
    return true
})

const initialState={
    members:[],
    fetched:false,
    setted:false
  }



export const slice = createSlice({
    name:'members',
    initialState:initialState,
    reducers:{
        setMembers:(state,action)=>{
            state.members=action.payload
            state.setted=true
        },
        groupRemovedM:(state,action)=>{   
            state.members=[],
            state.fetched=false,
            state.setted=false
        },

    },
    extraReducers:{
  
        [fetchMembers.fulfilled]:(state,action)=>{
    
            state.fetched=true
         
        },
         
    }
})

export const {setMembers,groupRemovedM} = slice.actions
export default slice.reducer;