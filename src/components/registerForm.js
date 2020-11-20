import React, { Component, useState } from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ActivityIndicator, Alert} from 'react-native'

import { useSelector,useDispatch } from "react-redux";
import { clearAuthAlert, registerUser} from '../reducers/authSlice';

const RegisterForm =()=> {

   
    const {auth} =useSelector(state=>state)
    const dispatch = useDispatch()
    const [loader, setloader] = useState(false)
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [rPassword, setrPassword] = useState()

    const handleRegister= async ()=>{
       
       
        if(!email || !password || !rPassword){
        
            return;
        }
        setloader(true)
        if(email.length <= 7 || password.length <=4){
            setloader(false)
            return;
        }
        if(password !== rPassword){
           
           Alert.alert('Las contraseñas no coinciden')
           setloader(false)
           return; 
        }
 
        dispatch(registerUser({email:email,password:password}))
        setloader(false)
    }
    if(auth.alert){
        Alert.alert('Error',auth.alert,[{text:'ok',onPress:()=>dispatch(clearAuthAlert())}])
        
    }

   
 
    return (
          <View>
                {loader ? 
                    (<ActivityIndicator size="large" color="#0f0" />):
                    (<View style={styles.body}>
                        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="lightgray" value={email} autoCapitalize='none' autoCompleteType='email' onChangeText={(text)=>setemail(text)}/>
                        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} placeholderTextColor="lightgray" value={password} autoCapitalize='none' autoCompleteType='password' onChangeText={(text)=>setpassword(text)}/>
                        <TextInput style={styles.input} placeholder="Repite Contraseña" secureTextEntry={true} placeholderTextColor="lightgray" value={rPassword} autoCapitalize='none' autoCompleteType='password' onChangeText={(text)=>setrPassword(text)}/>
                        <TouchableOpacity style={styles.submit} onPress={()=>handleRegister()}>
                            <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>Registrar</Text>
                        </TouchableOpacity>
                    </View>)
                }
                </View>
              
        )

    
}

export default RegisterForm;
const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
logo:{
    height:150,
    width:150,

},
title:{
    fontFamily:'metal',
    fontSize:35,
    color:'#00ff00'
},
input:{
    color:'black',
    borderBottomColor:'white',
    borderBottomWidth:1,
    marginVertical:5,
    width:300,
    borderRadius:5,
    fontSize:16
    
},

submit:{
    marginTop:20,
    backgroundColor:'#29f1c3',
    borderRadius:5,
    padding:10,
    width:250,
    marginLeft:30
}
});

