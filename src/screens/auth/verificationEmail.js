import React ,{useState}from 'react'
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity } from 'react-native'

import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { sendVerifyMail, userLogout } from '../../reducers/authSlice';
import { checkUserisverified } from '../../reducers/userSlice';


const verificationEmail = (props) => {

  const dispatch= useDispatch()
    return (
        <View>
          
            <Header />
          <Text style={{fontSize:18,padding:10}} >Porfavor verifica tu email para poder utilizar la aplicación</Text>
      
          <TouchableOpacity onPress={()=>dispatch(checkUserisverified())} style={styles.buttons}>
            <Text style={styles.btext}>Ya he verificado el correo!</Text>
          </TouchableOpacity>
          <Text style={{fontSize:18,padding:10}} >Revisa en tu buzón y si no te ha llegado puedes solcitar que se reenvie el correo</Text>
          <TextInput onChangeText={(text)=>setEmail(text)} editable={true} placeholder={'some@example.com'} style={{fontSize:18,padding:10,borderWidth:1,marginVertical:15,marginHorizontal:10}} />
          
          <TouchableOpacity  onPress={()=>dispatch(sendVerifyMail())} style={styles.buttons}>
            <Text style={styles.btext}>Reenviar correo verificacion</Text>
          </TouchableOpacity>

          <Text style={{fontSize:18,padding:10}} >Quieres utilizar otra cuenta?</Text>
          <TouchableOpacity  onPress={()=>dispatch(userLogout())} style={styles.buttons}>
            <Text style={styles.btext}>Cambiar de usuario</Text>
          </TouchableOpacity>
        </View>
    )
}

export default verificationEmail

const styles = StyleSheet.create({
  buttons:{
    margin:25,
    padding:15,
    borderRadius:8,
    backgroundColor:'rgba(0, 177, 106, 1)'
  },
  btext:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:16,
    textAlign:'center'
  }
})
