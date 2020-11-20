import React, { Component } from 'react'
import Logo from '../../assets/img/logo.png';
import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native'
import RegisterForm from '../../components/registerForm'
import { useNavigation } from '@react-navigation/native';

export default RegisterScreen = ({navigation:{navigate}}) =>{
    const navigation = useNavigation();
        return (
            <View style={styles.container}>
             <Image source={Logo} style={styles.logo}/>
             <Text style={{fontFamily:'goldman',fontSize:30,color:'#29f1c3'}}>SAFEHOOD</Text>
            <RegisterForm navigate={navigate} />
            <View style={styles.footer}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <Text  style={{color:'black',fontWeight:'bold',marginTop:15}}>Ya tienes una cuenta?  Login</Text>
                  </TouchableOpacity>
          </View>
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

});

