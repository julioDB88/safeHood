import React, { Component} from 'react'
import { View} from 'react-native'
import JoinGroupsScr from '../auxiliar/JoinGroupScreen';
import AlertsScreen from '../auxiliar/AlertsScreen';
import Header from '../../components/Header';
import { useSelector } from "react-redux";


const HomeScreen =()=>{

  const {group} = useSelector(state =>state);

  return(<View>
              <Header />
            
              {group.exists ? <AlertsScreen  />:<JoinGroupsScr />}
          </View>)

}

export default HomeScreen;

