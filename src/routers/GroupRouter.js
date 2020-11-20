import React from 'react'


import JoinRequestsScreen from '../screens/auxiliar/JoinRequestsScreen';
import UsersScreen from '../screens/auxiliar/UsersScreen';
import RecordsScreen from '../screens/main/RecordsScreen';
import ButtonsNavScreen from '../screens/auxiliar/ButtonsNavScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function GroupRouter() {
  return (
    <Stack.Navigator  >
      <Stack.Screen name="Main" component={ButtonsNavScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Usuarios" component={UsersScreen} />
      <Stack.Screen name="Alertas" component={RecordsScreen} />
      <Stack.Screen name="Peticiones" component={JoinRequestsScreen} />
    </Stack.Navigator>
  );
}


