
import React, { Component } from 'react'
import { StyleSheet, Text, View,FlatList,Image } from 'react-native'

import {useSelector,useDispatch} from 'react-redux';

import AlertItem from '../../components/Items/AlertItem'
import { fetchAlerts } from '../../reducers/alertsSlice';
import image from '../../assets/img/relax.jpg'

  
const RecordsScreen =()=>{
  const {group, alerts} = useSelector(state => state);
 const dispatch = useDispatch()

if(group.exists && !alerts.fetched){
  dispatch(fetchAlerts())
}

 const renderAlert=({item})=>(<AlertItem  data={item} />)
 
  return (
      <View style={{ flex: 1 }}> 
          {alerts.alerts.length > 0 ? 
          (<FlatList 
             inverted={true}
              style={{ flex: 1,marginHorizontal:5}}
              data={alerts.alerts}
              renderItem={renderAlert}
              keyExtractor={(item,index) => index.toString()}/>
          
          ) : (<View style={styles.container}><Image source={image} style={styles.image} /><Text style={styles.text}>Sin Alertas</Text></View>)}

        </View>
  )
    
}
export default RecordsScreen;

const styles = StyleSheet.create({ container:{
flex:1,
  justifyContent:'center',
  backgroundColor:'#ffff',
  alignItems:'center'
},
text:{
  color:'rgb(0, 177, 106)',
  fontFamily:'goldman',
  fontSize:24
},
image: {
  resizeMode:'contain',
  justifyContent: "center",
  alignItems:'center',
  height:200,
  width:200
},})
