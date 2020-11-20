
import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


export const createUserDB =createAsyncThunk('auth/createUserDB', async data=>{
   
   database().ref(`/users/${data.user.uid}`).set({name:'none',photo:'none'})
})

export const sendVerifyMail =createAsyncThunk('auth/sendVerificationMail', async data=>{
    auth().currentUser.sendEmailVerification()
})

export const removeAccount = createAsyncThunk('auth/removeAccount', async data=>{

    database().ref(`/users/${data.uid}`).remove()

    const email= auth().currentUser.email 
    const credential= auth.EmailAuthProvider.credential(email,data.password)
  
    let reauth= await auth().currentUser.reauthenticateWithCredential(credential)
    .then(dat=>{ auth().currentUser.delete();return {type:'ok'};   })
    .catch(e=>{ return {type:'error',msg: e}})
    console.log(reauth);
    return reauth
   
 
})

export const registerUser = createAsyncThunk('auth/createUser', async (data,{dispatch})=>{
   await auth().createUserWithEmailAndPassword(data.email,data.password)
     .then(authData=>{
        dispatch(createUserDB(authData))
       dispatch(sendVerifyMail())
     })
})
export const userLogout = createAsyncThunk('auth/logout', async (_,{getState,dispatch})=>{
    
    await auth().signOut()
    dispatch({type:'user/logout'})
})

export const logUser = createAsyncThunk('auth/login', async (data,{dispatch})=>{
    let verified;
    await auth().signInWithEmailAndPassword(data.email,data.pass).then(data=>{
        verified=data.user.emailVerified 
    })
    return verified;
})

export const resetPassword = createAsyncThunk('auth/resetPassword',async (data)=>{
  return  await  auth().sendPasswordResetEmail(data)
})


const slice = createSlice({
    name:'auth',
    initialState:{
       logged:null,
       authError:null,
       alert:null,
       loader:false,
       status:'idle',
    },
    reducers:{
        loginUser:(state,action)=>{
            state.logged=true,
            state.verified= action.payload.verified
        },
        clearAuthAlert:(state,action)=>{
            state.alert=null
        },
        setLogged:(state,action)=>{
            
            state.logged=true
        }
    },
    extraReducers:{
    [registerUser.fulfilled]:(state,action)=>{
        state.logged=true
    },
    [registerUser.rejected]:(state,action)=>{
        state.alert=action.error.message;
    }, 
    [logUser.fulfilled]:(state,action)=>{
        state.logged=true;
        state.verified=action.payload
    },
    [logUser.rejected]:(state,action)=>{
        state.alert=action.error.message;
    },
    [userLogout.fulfilled]:(state,action)=>{
        state.logged=false;
    },
    }
})

export const {clearAuthAlert,setAuthAlert,loginUser,setLogged} = slice.actions




export default slice.reducer;