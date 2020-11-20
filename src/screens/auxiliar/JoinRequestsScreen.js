
import React, { Component } from 'react'
import { Text, StyleSheet, View,FlatList, Alert,Image } from 'react-native'
import {useSelector,useDispatch} from 'react-redux';

import UserItem from '../../components/Items/userRequestItem'
import { acceptPetition,denyPetition, fetchPetitions } from '../../reducers/joinRequestsSlice';
import image from '../../assets/img/alone.jpg'


const JoinRequestsScreen =()=> {
    const {petitions,user,group} = useSelector(state => state);
    const dispatch = useDispatch()

    if(group.exists && !petitions.fetched){dispatch(fetchPetitions())}

    const acceptUserRequest =(joiningUser)=>{

        let data = {
            groupId:group.id,
            user:{
                uid: joiningUser.id,
                name: joiningUser.name || 'none',
                photo: joiningUser.photo || 'none',
                role:'user'
            }
           
          }
    
        dispatch(acceptPetition(data)).then(data=>{if(data.payload.status=='error'){return Alert.alert('En otro grupo','Este usuario ya está en otro grupo')}})
    }
    const rejectUserRequest=(petition)=>{
  
        let data={
            groupId:group.id,
            userId:petition.id,
            groupName:group.name
        }
      
        dispatch(denyPetition(data))
    }


    const renderRequest=({item})=>(<UserItem data={item} accept={acceptUserRequest} reject={rejectUserRequest}/>);

       return( <View style={{flex:1}}>
            {petitions.petitions.length >  0 ?
            (
                <FlatList 
                data={petitions.petitions}
                renderItem={renderRequest}
                keyExtractor={(item,index)=>index.toString()}
                />
            ):(<View style={styles.container}><Image source={image} style={styles.image} /><Text style={styles.text}>Sin solicitudes</Text></View>)}
            </View>)
}

export default JoinRequestsScreen;
const styles = StyleSheet.create({
    container:{
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
    },
})
