import React, { Component } from 'react'
import { Text, View,Image,StyleSheet } from 'react-native'
import Logo from '../../assets/img/logo.png';
export default class SplashScreen extends Component {
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#000',justifyContent:'center',alignItems:'center'}}>
                <Image source={Logo} style={styles.logo}/>
                <Text style={{fontFamily:'goldman',fontSize:30,color:'#29f1c3'}}>SAFEHOOD</Text>
                <Text style={{fontFamily:'goldman',fontSize:25,color:'#29f1c3', marginVertical:40}}> Cargando datos... </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
 
    logo:{
        height:150,
        width:150,
 
    }})