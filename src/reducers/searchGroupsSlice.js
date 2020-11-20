
import { createSlice,createAs, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';
import {groupBy} from 'lodash'

export const fetchStreetsByCode = createAsyncThunk('sgroup/fetchStreets',async (zipCode)=>{
    let streets=[];
    let groupsRef= await database().ref(`groups`)
        await groupsRef.orderByChild('zCode').equalTo(`${zipCode}`).once('value').then(snap=>{
        
        if(snap.exists()){
            snap.forEach(elem=>{
                
                streets.push({street:elem.val().street,id:elem.key})
            })
        }
    
    })
    let grouped =groupBy(streets,'street')
   
    return Object.keys(grouped)
});

export const fetchGroupsbyStreet = createAsyncThunk('sgroup/fetchGroups',async (street)=>{

    let groups=[];
    let groupsRef= await database().ref(`groups`)
    await groupsRef.orderByChild('street').equalTo(`${street}`).once('value').then(snap=>{
        
        if(snap.exists()){
            snap.forEach(elem=>{
               let usersCount= Object.keys(elem.val().users).length;
                groups.push({name:elem.val().name,id:elem.key,users:usersCount,numbers:elem.val().numbers,photo:elem.val().photo})
            })
        }
    
    });

  
    return groups
});


export const sendJoinRequest =createAsyncThunk('sgroup/sendPetition',async data =>{
     let userPetitionRef= await database().ref(`/groups/${data.groupId}/joinRequests/${data.userId}`)
    
     userPetitionRef.set({name:data.name,photo:data.photo,status:'pending'})   
});

export const slice = createSlice({
    name:'sGroup',
    initialState:{
        postalCode:null,
        streetName:null,
        groupName:null,
        loader:false
    },
    reducers:{
        setStreetsByCode:(state,action)=>{
            state.streetsByCode=action.payload
        },
        setGroupsByStreet:(state,action)=>{
            state.streetGroups=action.payload
        },
    },
    extraReducers:{
        [fetchStreetsByCode.fulfilled]:(state,action)=>{
          
            state.loader=false
        },
        [fetchStreetsByCode.pending]:(state,action)=>{
            state.loader=true
        },
        [fetchStreetsByCode.rejected]:(state,action)=>{
   
            state.loader=false
        },
      
    }
})

export const {setStreetsByCode,setGroupsByStreet} = slice.actions


export default slice.reducer;