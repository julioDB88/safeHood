import React,{useState,useEffect} from 'react'
import { StyleSheet} from 'react-native'
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/HomeScreen'
import MapScreen from '../screens/main/MapScreen'

import { Icon } from 'react-native-elements';
import SettingsScreen from '../screens/main/SettingsScreen';
import GroupRouter from './GroupRouter';

const Tab = createBottomTabNavigator();
const AppRouter = () => { 

 return (
    <NavigationContainer theme={{...DefaultTheme,colors:{...DefaultTheme.colors,background:'white'}}}  >
      <Tab.Navigator   tabBarOptions={{activeBackgroundColor:'rgba(0, 177, 106, 1)',activeTintColor:'white'}} >
        <Tab.Screen name="Home" component={HomeScreen} options={{tabBarLabel:'Inicio', tabBarIcon:()=>(<Icon name="home" color="rgba(0, 177, 106, 1)"/>) }} />
        <Tab.Screen name="Group" component={GroupRouter} options={{tabBarLabel:'Grupo', tabBarIcon:()=>(<Icon name="group" color="rgba(0, 177, 106, 1)"/>) }}/>
        <Tab.Screen name="Map" component={MapScreen} options={{tabBarLabel:'Mapa', tabBarIcon:()=>(<Icon name="map" color="rgba(0, 177, 106, 1)"/>) }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarLabel:'Ajustes', tabBarIcon:()=>(<Icon name="settings" color="rgba(0, 177, 106, 1)"/>) }}/>
      </Tab.Navigator>
    </NavigationContainer>
    )
}

export default AppRouter

const styles = StyleSheet.create({})
