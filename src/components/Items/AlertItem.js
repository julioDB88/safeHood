
import React, { Component } from 'react'
import { Text,View,StyleSheet, Image,TouchableOpacity, Dimensions} from 'react-native'
import Lightbox from 'react-native-lightbox';
import {useSelector} from 'react-redux'
import ayuda from '../../assets/img/help.png'
import suministro from '../../assets/img/electricidad.png'
import sospecha from '../../assets/img/suspect.png'
import urgencia from '../../assets/img/sirena.png'
import violencia from '../../assets/img/violence.png'
import robo from '../../assets/img/thief.png'
import idea from '../../assets/img/idea.png'
import reporte from '../../assets/img/report.png'
import vial from '../../assets/img/street.png'



const Item =  ({data} ) => {

  const members = useSelector(state => state.members)
 const getImage=()=>{
   switch(data.type.type){
     case 'Robo': 
     return robo;
     case 'Violencia': 
     return violencia;
     case 'Urgencia': 
     return urgencia;
     case 'Sospecha': 
     return sospecha;
     case 'Ayuda': 
     return ayuda;
     case 'Suministro': 
     return suministro;
     case 'Idea': 
     return idea;
     case 'Reporte': 
     return reporte;
     case 'Vial': 
     return vial;
   }
 }
 console.log(data.photo);
  let user =members.members.find(elem=>elem.uid==data.uid)
return  (<View style={[styles.container,{borderColor:data.type.color}]}>
            <View style={[styles.header,{borderBottomColor:data.type.color}]}>
                <Text style={styles.title}>{user.name}</Text>
                <Text style={{color:'black',textAlign:'right'}}>{new Date(data.time).toLocaleDateString()} - {new Date(data.time).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.body}>
              <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                  <Image source={getImage()} style={styles.avatar} />
                  <Text style={styles.text}>{data.message}</Text>
                 
              </View>
             
            </View>
            {(data.photo !== 'none') && <Lightbox underlayColor="white" renderHeader={close => (
        <TouchableOpacity onPress={close} style={{flex:1}}>
          <Text style={styles.closeButton}>Cerrar</Text>
        </TouchableOpacity>
      )}><Image source={{uri:data.photo}} re style={{flex:1, height:100,resizeMode:'cover'}}/></Lightbox> }
        </View>)
} 

  export default Item;
  const styles = StyleSheet.create({ 
    container:{margin:6,padding:10,borderWidth:2,borderRadius:10},
    header:{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1},
    body:{flexDirection:'row',paddingVertical:5},
    closeButton: {
      color: 'white',
      borderWidth: 1,
      borderColor: 'white',
      padding: 8,
      borderRadius: 3,
      textAlign: 'center',
      margin: 10,
      alignSelf: 'flex-end',
    },
    item: {
      flexDirection:'row',
      flex:1,
      alignItems:'center',
      alignContent:'center'
  },
  avatar: {
margin:5,
    height: 50,
    width: 50,
    borderRadius: 150
},
  title: {
    fontSize: 18,
    fontWeight:'bold',
    textTransform:'capitalize'
  },
  text:{
    fontSize:16
  }

})