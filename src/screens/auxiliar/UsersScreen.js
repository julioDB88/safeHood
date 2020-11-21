import React,{Component} from 'react'
import { StyleSheet, Text, View,FlatList, Alert,Image,Dimensions } from 'react-native'

import UserItem from '../../components/Items/userItem';
import { useSelector,useDispatch } from "react-redux";
import {setNewAdmin, switchRole } from '../../reducers/groupSlice';
import { removeMember,fetchMembers } from '../../reducers/membersSlice';
import image from '../../assets/img/alone.jpg'


const UsersScreen =(props)=>{

   
    const dispatch = useDispatch()
  
    const {user,group,members} = useSelector(state=>state)
    
    const setNewGroupAdmin=(uid)=>{
        
        let data={groupId:group.id, newAdmin:uid, user:user.uid    }
     
       dispatch(setNewAdmin(data))
        dispatch(switchRole()) 
       
    }

    const confirmNewAdmin = (uid)=>{
       return Alert.alert('Cambiar Administrador','Seguro deseas nombrar como administrador?',[{text:'si',onPress:()=>setNewGroupAdmin(uid)},{text:'cancel'}],{cancelable:true})
    }

    const removeGroupMember = (uid) => {
        let data={member:uid,group:group.id}
      
        dispatch(removeMember(data))
    }

    const confirmRemove=(userid)=>{
        Alert.alert('Eliminar Usuario','Seguro desea Eliminar usuario?',[{text:'si',onPress:()=>removeGroupMember(userid)},{text:'cancel'}],{cancelable:true})
    }

    if( group.exists && !members.fetched  ){
        dispatch(fetchMembers(group.id))
    }
    const renderUser=({item})=>(<UserItem user={item} remove={confirmRemove} setAdmin={confirmNewAdmin} />)
 

      return(<View style={styles.container}>
          {members.members.length >1? 
            (<FlatList 
                data={members.members}
                renderItem={renderUser}
                keyExtractor={(item,index)=>index.toString()}
            />
            ):(<View style={{alignItems:'center'}}><Image source={image} style={styles.image} /><Text style={styles.text}>Estas Solito</Text></View>)
            }
      
    </View>
)

}
  
export default UsersScreen;
   


const styles = StyleSheet.create({ 
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#ffff'
    },
    image: {
        resizeMode:'contain',
        justifyContent: "center",
        alignItems:'center',
        height:200,
        width:200
    },
    text:{
        color:'rgb(0, 177, 106)',
        fontFamily:'goldman',
        fontSize:24
    }
})
