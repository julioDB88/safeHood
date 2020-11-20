import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import {useSelector} from 'react-redux'
import trash from '../../assets/img/trash.png'
import ascend from '../../assets/img/ascend.png'

export default UserItem = (props) => {
    const{user,group}  = useSelector(state => state)
        let url = props.user.photo != 'none' ? props.user.photo : 'https://i.pinimg.com/564x/91/50/e5/9150e5fb9d65f973ff963efd31d3817b.jpg';
        if(props.user.uid != user.uid){
        return (
            <View style={ styles.container} >
                <View  style={{  flexDirection: 'row',alignItems:'center' }} >
                    <Image style={styles.avatar} source={{ uri: url }} />
                    <Text style={{ marginHorizontal: 15, fontSize: 24 }}>{props.user.name}</Text>
                  
                </View>
               { group.isAdmin &&
                (<View style={{flexDirection: 'row', flex:1,justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>props.setAdmin(props.user.uid)}><Image source={ascend} style={styles.icon}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>props.remove(props.user.uid)}><Image source={trash} style={styles.icon}/></TouchableOpacity>
                </View>)}
                
            </View>
        )} else{
            return ( 
                <View style={ styles.container} >
                    <View  style={{  flexDirection: 'row',alignItems:'center' }} >
                        <Image style={styles.avatar} source={{ uri: url }} />
                        <Text style={{ marginHorizontal: 15, fontSize: 24 }}>Yo</Text>
                    </View> 
                </View>)
        }
    
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 15, flexDirection: 'row', borderBottomWidth:2,borderBottomColor:'rgba(0, 177, 106, 1)'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 150
    },
    icon: {
        height: 50,
        width: 50,
     
    }
})
