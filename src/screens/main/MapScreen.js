import React, { useState } from 'react'
import { StyleSheet, View ,Dimensions,Text} from 'react-native'
import Header from '../../components/Header';
import geojson from '../../coordinates.json';
import MapView ,{PROVIDER_GOOGLE}from 'react-native-maps';

import { useDispatch,useSelector } from 'react-redux';
const MapScreen = () => {
const group =useSelector(state=>state.group)
const allwide=Dimensions.get('window').width;

let latitude = group.id ? geojson.find(elem=>elem.code==group.zCode).coords[0]: geojson.find(elem=>elem.code=='08320').coords[0]
let longitude = group.id ? geojson.find(elem=>elem.code==group.zCode).coords[1]: geojson.find(elem=>elem.code=='08320').coords[1];



  return (
        <View style={{ flex: 1}}>
          <Header />
          <View style={{ flex: 1,justifyContent:'center',alignItems:'center'}}>
          <MapView
            style={{flex:1,height:400,width:allwide}}
                scrollEnabled={true}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: latitude ,
                  longitude: longitude,
                  latitudeDelta:0.02,
                  longitudeDelta:0.02
                }}
              />
          </View>
        </View>
    )
}

export default MapScreen;

const styles = StyleSheet.create({})
/**
 * 
           
 *         
 */