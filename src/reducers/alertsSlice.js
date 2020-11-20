
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';


export const fetchAlerts = createAsyncThunk('alerts/fetchAll',async (groupId,{dispatch})=>{
    
   await database().ref(`/groups/${groupId}/alerts`).on('value',snap=>{
     
     let alertsArray=[]
      snap.forEach((child) => {
          let anAlert= { ...child.val(),id: child.key,}
          alertsArray.push(anAlert)
          
        });
      dispatch(setAlerts(alertsArray.reverse()));
    })
  })


export const postNewAlert =createAsyncThunk('alerts/postNew',async (alert)=>{
    let newAlertKey = database().ref(`/groups/${alert.groupId}`).child('alerts').push().key

    database().ref(`/groups/${alert.groupId}/alerts/${newAlertKey}`)
    .set(alert.data)
    return true
})

const initialState={
  alerts:[],
  fetched:false,
  status:'idle',
  setted:false
}


export const slice = createSlice({
    name:'alerts',
    initialState:initialState,
    reducers:{
        setAlerts:(state,action)=>{   
         state.alerts =action.payload
         state.setted=true
        },
        groupRemovedA:(state,action)=>{   
          state.alerts=[],
          state.fetched=false,
          state.setted=false
        },

    },
    extraReducers:{
        [fetchAlerts.fulfilled]:(state,action)=>{
            state.fetched=true
        },
        
    }
})

export const {setAlerts,groupRemovedA} = slice.actions
export default slice.reducer;