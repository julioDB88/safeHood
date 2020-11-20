import React from 'react'
import {  StyleSheet, Text, View,Image, Linking } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Logo from '../../assets/img/logo-white.png';

export default function HelpScreen() {
    return (
       
        <View style={styles.containter}>
            <View style={styles.header}>
            <Image source={Logo} style={styles.logo}/>
            <Text style={styles.title} >SAFEHOOD</Text>
            </View>
            <ScrollView>
            <View style={{marginVertical:15}}></View>
            <Text style={styles.subtitle}> OBJETIVO</Text>
          <Text style={styles.ntext}>El propósito de esta APP es crear grupos entre vecinos para alertar sobre situaciones extraordinarias.</Text>
          <Text style={styles.subtitle}> INTENCIÓN </Text>
          <Text style={styles.ntext}>Se limita la cantidad de texto enviada por alerta, evitando abrumar o confundir a vecinos. Alertar sólo de lo IMPORTANTE y ESENCIAL.</Text>
          <Text style={styles.subtitle}> LIMITACIONES </Text>
          <Text style={styles.ntext}>Esta APP aún se encuentra en desarrollo, por lo que por ahora solo se puede pertenecer a un grupo , con un único administrador. El mapa aún no muestra las distintas alertas pero será una funcionalidad de pago</Text>
          <Text style={styles.subtitle}> + INFO </Text>
          <Text style={styles.ntext} onPress={()=>Linking.openURL('http://blackwolfsolutions.net')}> Visita BlackWolfSolutions.net </Text>

          </ScrollView>
        </View>
    
    )
}

const styles = StyleSheet.create({
    containter:{
        flex:1,backgroundColor:'turquoise'
    },
    header:{flexDirection:"row",alignItems:'center', borderBottomColor:'#fff',borderBottomWidth:2,justifyContent:'center'},
    title:{
        color:'#fff',
        fontFamily:'goldman',
        fontSize:30,
        paddingTop:15,
        textAlign:'center',
  
    },
    subtitle:{
        color:'#fff',
        fontSize:24,
        fontFamily:'goldman',
        textAlign:'center'
    },
    ntext:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:18,
        margin:15,
       
    },
    logo:{
        resizeMode:'contain',
        height:30,
        width:30,
        marginTop:7
    
    }
})
