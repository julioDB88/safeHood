
import React, { Component } from 'react'
import { Text,View,StyleSheet, Image} from 'react-native'
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
   let img;
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
  let user =members.members.find(elem=>elem.uid==data.uid)
return  (<View style={[styles.container,{borderColor:data.type.color}]}>
            <View style={[styles.header,{borderBottomColor:data.type.color}]}>
                <Text style={styles.title}>{user.name}</Text>
                <Text style={{color:'black',textAlign:'right'}}>{new Date(data.time).toLocaleDateString()} - {new Date(data.time).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.body}>
              <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                  <Text style={styles.text}>{data.message}</Text>
                  <Image source={getImage()} style={styles.avatar} />
              </View>
            </View>
        </View>)
} 

  export default Item;
  const styles = StyleSheet.create({ 
    container:{margin:6,padding:10,borderWidth:2,borderRadius:10},
    header:{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1},
    body:{flexDirection:'row',paddingVertical:5},
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