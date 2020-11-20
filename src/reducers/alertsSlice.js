
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

export const fetchAlerts = createAsyncThunk('alerts/fetchAll',async (groupId,{dispatch})=>{
    
   await database().ref(`/groups/${groupId}/alerts`).limitToLast(3).on('value',snap=>{
     let alertsArray=[]
      snap.forEach((child) => {
          let anAlert= { ...child.val(),id: child.key,}
          alertsArray.push(anAlert)
          
        });
      dispatch(setAlerts(alertsArray.reverse()));
    })
  })


export const postNewAlert =createAsyncThunk('alerts/postNew',async (alert)=>{
//subir la imagen a storage
let newAlertKey = database().ref(`/groups/${alert.groupId}`).child('alerts').push().key
  if(alert.data.photo != 'none'){
      let alertsRef= storage().ref(`groupAlerts/${alert.groupId}/${alert.data.photo.filename}`);
      await alertsRef.putFile(alert.data.photo.path).on('state_changed', async (snap)=>{
          if(snap.state=='success') {
              await  snap.ref.getDownloadURL().then(url=>{
              
                let cleanData ={
                  uid:alert.data.uid,
                  time: alert.data.time,
                  message:alert.data.message,
                  type:alert.data.type,
                  photo:url
                }
                database().ref(`/groups/${alert.groupId}/alerts/${newAlertKey}`)
                .set(cleanData)  
              })
          }; 
      })
  }else{
      database().ref(`/groups/${alert.groupId}/alerts/${newAlertKey}`)
      .set(alert.data)  
  }
  
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