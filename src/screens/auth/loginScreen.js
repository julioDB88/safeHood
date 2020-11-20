
import React, { Component,useState } from 'react'
import LoginForm from '../../components/loginForm'
import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity, Alert,Modal} from 'react-native'
import Logo from '../../assets/img/logo.png';
import {useSelector,useDispatch} from 'react-redux'
import { resetPassword } from '../../reducers/authSlice';



export default loginScreen = ({navigation:{navigate}}) =>{


    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [showModal, setshowModal] = useState(false)
    const [remEmail, setremEmail] = useState()

    const sendResetPassword = async () =>{
        if (!remEmail){
            return
        }
        if(remEmail.length <=7){
            return Alert.alert('Email incorrecto')
        }
        
        dispatch(resetPassword(remEmail)).then(data=> { 
            if(data.error){
            Alert.alert('Error',data.error.code)}
        })
    }

        return (
          <View style={styles.container}>
           
          <Image source={Logo} style={styles.logo}/>
<Text style={{fontFamily:'goldman',fontSize:30,color:'#29f1c3'}}>SAFEHOOD</Text>
       
          <LoginForm/>
          <View style={styles.footer}>
              
                    <TouchableOpacity onPress={()=>navigate('Register')}>
                        <Text style={[styles.footertexts,{color:'#29f1c3'}]}>Registrarse </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>setshowModal(true)}>
                         <Text style={styles.footertexts}>Olvidaste contraseña?</Text>
                    </TouchableOpacity>
                
            </View>
            <Modal visible={showModal}>
                <View style={styles.modal} >   
                <Image source={Logo} style={styles.logo}/>
                     <Text style={{fontFamily:'goldman',fontSize:30,color:'#29f1c3'}}>SAFEHOOD</Text>
                    <Text>Recordar contraseña</Text>

                    <TextInput value={remEmail} style={styles.input} placeholder="Email" placeholderTextColor="black"  onChangeText={(text)=>setremEmail(text)} />
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.modalButtons} onPress={()=>setshowModal(false)}>
                        <Text style={{color:'black',textAlign:'center'}} >Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButtons} onPress={()=>sendResetPassword()}>
                        <Text style={{color:'black',textAlign:'center'}} >Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
          </View>
        )
    
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    logo:{
        height:150,
        width:150,
 
    },
    title:{
        fontFamily:'goldman',
        fontSize:35,
        color:'#00ff00'
    },

    modal:{ 
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
      },
      modalButtons:{
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:8,
        backgroundColor:'#29f1c3',
        width:100
      },
      input:{
        borderBottomColor:'black',
        borderBottomWidth:1,
        width:310
      },
    footer:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:350,
        paddingVertical:15
    },
    footertexts:{color:'black',marginVertical:10,fontWeight:'bold',fontFamily:'goldman',fontSize:18}
})

