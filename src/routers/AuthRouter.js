import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/loginScreen';
import RegisterScreen from '../screens/auth/registerScreen';

const AuthStack = createStackNavigator();

const Authrouter = () =>(
    <NavigationContainer>
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen}   options={{headerShown:false}} />
            <AuthStack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />        
        </AuthStack.Navigator>
    </NavigationContainer>
)

export default Authrouter;
