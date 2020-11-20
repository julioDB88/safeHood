
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ActivityIndicator, Alert} from 'react-native'
import { useSelector,useDispatch } from "react-redux";
import { clearAuthAlert } from '../reducers/authSlice';
import { logUser } from '../reducers/authSlice';


const loginForm =()=>{
const auth  = useSelector(state=>state.auth)
    
    const dispatch = useDispatch()
    const [loader, setloader] = useState(false)
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
   

   
    
    const handleLogin = async ()=>{
        if(!email || !password){return}
        setloader(true)
        
        if(email.length <= 8 || password.length <=4){
             setloader(false)
             return
        }
        dispatch(logUser({email:email,pass:password}))
        setloader(false)
    }

    if(auth.alert){
        Alert.alert('Error',auth.alert,[{text:'ok',onPress:()=>dispatch(clearAuthAlert())}])
    }
   
    return (
        
        <View style={styles.body}>
            {loader ? 
            (<ActivityIndicator size={150} color='lime'/>
            ) : ( <><TextInput style={styles.input} placeholder="Email" placeholderTextColor="lightgray" value={email} autoCapitalize='none' autoCompleteType='email' onChangeText={(text)=>setemail(text)}/>
               <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} placeholderTextColor="lightgray" value={password} autoCapitalize='none' autoCompleteType='password' onChangeText={(text)=>setpassword(text)}/>
               
               <TouchableOpacity style={styles.submit} onPress={()=>handleLogin()}>
                   <Text style={{color:'#fff',textAlign:'center',fontSize:18,fontWeight:'bold' }}>Entrar</Text>
               </TouchableOpacity></>)
            }
         
            
        </View>
    )
    
}
export default loginForm;
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
        borderBottomColor:'black',
        borderBottomWidth:1,
        margin:10,
        width:300,
        fontSize:18,
        borderRadius:5,
        
    },
    modal:{ 
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#457dcc'
      },
    modalButtons:{
        marginTop:25,
        backgroundColor:'#29f1c3',
        paddingVertical:7,
        paddingHorizontal:30,
        borderRadius:5
    },
    submit:{
        margin:10,
        backgroundColor:'#29f1c3',
        borderRadius:5,
        padding:10,
        alignSelf:"center",
        width:150,
   
    },

    
})