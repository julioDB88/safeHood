import React from 'react'
import { Text, StyleSheet, View,TouchableOpacity, Image,Alert  } from 'react-native'
import deny from '../../assets/img/deny.png'
import okay from '../../assets/img/okay.png'

const confirmDenial = (data,reject)=>{
    Alert.alert(`Rechazar a ${data.name} ?`,'¿Deseas rechazar la petición para unirse al grupo?',
    [
        
        { text: "OK", onPress: () => reject(data), style:'default' }
    ],{cancelable:true}
);
}
const confirmAcceptance=(data,accept)=>{

    Alert.alert(`Aceptar a ${data.name} ?`,'¿Deseas aceptar la petición para unirse al grupo?',
        [
           
            { text: "OK", onPress: () => accept(data), style:'default' }
        ],{cancelable:true}
    );
}

const Item = ({data,accept,reject})=>{

    let url= data.photo != 'none' ? data.photo : 'https://i.pinimg.com/564x/91/50/e5/9150e5fb9d65f973ff963efd31d3817b.jpg';

    return(
    <View style={styles.container} >
        
            
        <Image style={styles.avatar} source={{uri: url}} />
        <Text style={{marginHorizontal:15,fontSize:24}}>{data.name}</Text>
      
        <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>confirmAcceptance(data,accept)}style={{flex:1}}>
            <Image source={okay} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>confirmDenial(data,reject)} style={{flex:1}}>
            <Image source={deny} style={styles.icon} />
        </TouchableOpacity>
        
    </View>
            
    )     

};
export default Item;
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:8, paddingVertical:15,flexDirection:'row',alignItems:'center',marginVertical:5,borderBottomWidth:1,justifyContent:'space-around'
    },
    avatar:{
        height:50,
        width:50,
        borderRadius:150
    }, 
    icon:{
        height:50,
        width:50,
        alignSelf:'center'
    }
})