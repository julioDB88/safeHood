/**
 * @format
 */

import {AppRegistry,View,Text,StatusBar} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import App from './App';

import React from 'react';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import store from './src/store';
import {BannerAd, TestIds,BannerAdSize } from '@react-native-firebase/admob';
import SplashScreen from './src/screens/auxiliar/SplashScreen';

const MyApp =()=>{

const netInfo = useNetInfo();

if(netInfo.isConnected){
   return (<Provider store={store}>
        <StatusBar hidden={true} />
       <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER}/>
      <App />
   </Provider>) 
   } else {
      return (<SplashScreen/>)
   }
}
   

AppRegistry.registerComponent(appName, () => MyApp);
