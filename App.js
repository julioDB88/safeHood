/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect } from 'react';
import { Alert} from 'react-native';

import Authrouter from './src/routers/AuthRouter'
import AppRouter from './src/routers/AppRouter';

import SplashScreen from './src/screens/auxiliar/SplashScreen';
import authen from '@react-native-firebase/auth';
import VerificationEmail from './src/screens/auth/verificationEmail';
import { useSelector,useDispatch } from "react-redux";
import { clearUserAlert, fetchUser,setVerified}from './src/reducers/userSlice';
import { setLogged }from './src/reducers/authSlice';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';

admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // El contenido de anuncios no mostrara casinos, porno y cosas del estilo
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    // Request config successfully set!
  });


const App: () => React$Node = () => {



  const dispatch = useDispatch()
  const  {user,auth,group}  = useSelector(state =>state);

    // Handle user state changes
  const onAuthStateChanged=(authUser)=> {

    if(authUser && !auth.logged){
      dispatch(setLogged()) 
  }
  }


  useEffect(() => {
 
    const subscriber = authen().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  
  }, []);

  const verifyUser =async () =>{
 
    await authen().currentUser.reload()
    if(authen().currentUser.emailVerified){dispatch(setVerified())}
    
  }

if(user.msg){
  Alert.alert('Borrado',user.msg)
 dispatch(clearUserAlert(user.uid))
  
}

if(!auth.logged) { return (<Authrouter />)} 

if(auth.logged && !user.fetched ){
  dispatch(fetchUser())
  return (<SplashScreen/>)
}

if(user.fetched && !user.verified){
  return(<VerificationEmail user={user} verify={verifyUser}/>)
}
if(user.hasGroup && !group.fetched ){

  return (<SplashScreen/>)
}
return  (<AppRouter />)
}

export default App;
