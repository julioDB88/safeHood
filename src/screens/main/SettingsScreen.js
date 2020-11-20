import React, { Component, useState } from 'react'
import { Text, StyleSheet, View ,Button, Alert, Image,TouchableOpacity} from 'react-native'
import Header from '../../components/Header'

import DialogInput from 'react-native-dialog-input';

import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'
import { updateDisplayName,updateUserPhoto,abandonedGroup } from '../../reducers/userSlice';
import { removeAccount, userLogout } from '../../reducers/authSlice';

import {useSelector,useDispatch} from 'react-redux';
import { removeAllGroup, removeUserFromGroup,setGroupPhoto } from '../../reducers/groupSlice';
import anon from '../../assets/img/anon.png'

const options = {
    title: 'Selecciona Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    chooseFromLibraryButtonTitle:'Abrir Galeria',
    takePhotoButtonTitle:'Hacer foto',
    mediaType:'photo'
  };



 const SettingsScreen = () => {

    const dispatch = useDispatch()

    //allow navigation
    const navigation = useNavigation()

    //global
    const {user,group} = useSelector(state =>state)

    //local
    const [nickDialog, setnickDialog] = useState(false)
    const [photoDialog, setphotoDialog] = useState(false)
    const [removeAccountDialog, setremoveAccountDialog] = useState(false)
    //signout
    const handleLogout = () =>{  dispatch(userLogout())}

    //dialogs
    const handleNickDialog=()=>{ setnickDialog(!nickDialog) }
    const handlePhotoDialog=()=>{ setphotoDialog(!photoDialog) }
    //random foto
    const nofoto = 'https://i.pinimg.com/564x/91/50/e5/9150e5fb9d65f973ff963efd31d3817b.jpg';
    //mods

    const clearAllData=()=>{
        dispatch(abandonedGroup())
        dispatch(removeAllGroup({groupId:group.id,userId:user.uid})) 
    }
    const quitFromGroup=()=>{

        if(group.isAdmin){
            return  Alert.alert(   
                    'Eres Administrador!',
                    'Se eliminará todo el grupo, ¿Deseas nombrar un nuevo administrador? asi los usuarios permanecerán',
                    [
                        {text:'Nombrar Admin', onPress:()=>navigation.navigate('Group',{screen:'Usuarios'})},
                        {text:'Borrar grupo',onPress:()=>{clearAllData()}}
                    ],
                    {cancelable:true}
            );
        } 
        
        dispatch(abandonedGroup())
        dispatch(removeUserFromGroup({groupId:group.id,userId:user.uid}));
          
     }

    const confirmQuitGroup = ()=>{
        return Alert.alert(
            'Salir del grupo', 
            'Seguro desea salir del grupo?',
           [
               { text:'ok', style:'default',onPress:()=>quitFromGroup()},
               { text:'Cancel', style:'cancel'}
           ],{cancelable:true}
       );
    }
     

    const updateUserName= (newname)=>{
        if(!newname || newname.length <= 4){
            return  Alert.alert('Nick Incorrecto','Nick ha de ser superior a 4 caracteres')
        }
        
        let data={groupId:group.id || null , userId:user.uid, name:newname}
        dispatch(updateDisplayName(data))
       
        setnickDialog(!nickDialog)
    }
    const updateGroupPhoto = ()=>{

        ImagePicker.showImagePicker(options, async (response) => {
        
            if (response.didCancel) {
                return 
            } else if (response.error) {
                return  Alert.alert('Error','ImagePicker Error: ' +response.error);
            } else {
                let data={
                    resp:response,
                    groupId: group.id || false
                }
                dispatch(setGroupPhoto(data))
               
            }
          });
          return
    }

 

    const modifyUserPhoto =  () =>{
        ImagePicker.showImagePicker(options, async (response) => {
        
            if (response.didCancel) {
                return 
            } else if (response.error) {
                return  Alert.alert('Error','ImagePicker Error: ' +response.error);
            } else {
                let data={
                    resp:response,
                    userId:user.uid,
                    groupId: group.id || false
                }
                dispatch(updateUserPhoto(data))
            }
          });
          return
     }
    const deleteAccount =  (password) =>{ 
        setremoveAccountDialog(false)

        if(group.exists){
           
            group.isAdmin ? clearAllData() :  removeUserFromGroup({groupId:group.id,userId:user.uid})
        }
    dispatch(abandonedGroup())
        
            
       dispatch(removeAccount({uid:user.uid,password:password}))
       .then(data=>{
           if(data.payload.type=='error'){
               return Alert.alert('Error',data.payload.msg.message)
           }else{
                dispatch({type:'user/logout'})
           }
        })
       
    }

    return (
            <View style={styles.container}>
                <Header />
                <View style={styles.settingHeader}>
                    <TouchableOpacity  onPress={()=>modifyUserPhoto()} >
                        {!user.photo  ?(<Image source={anon} style={styles.avatar} />): (<Image source={{uri:user.photo }} style={styles.avatar} />)}
                        
                    </TouchableOpacity>
                </View>
                <TouchableOpacity  onPress={()=>handleNickDialog()} style={styles.item}>
                    <View style={styles.nickbar}>
                            <Text style={styles.itemText}>{user.name || 'Anonymous '}</Text>
                            <Icon name="edit" adjustsFontSizeToFit="true"/>
                    
                    </View>
                </TouchableOpacity>

                { group.exists ? 
                    (<TouchableOpacity  onPress={()=>confirmQuitGroup()} style={styles.item}>
                    <Text style={{fontSize:18}}>Salir del Grupo</Text>
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity  onPress={()=>navigation.navigate('Home')} style={styles.item}>
                    <Text style={{fontSize:18}}>Buscar Grupo</Text>
                    </TouchableOpacity>)
                }   

                {group.isAdmin && 
                 (<TouchableOpacity  onPress={()=>updateGroupPhoto()} style={styles.item}>
                 <Text style={{fontSize:18}}>Cambiar foto grupo</Text>
                 </TouchableOpacity>)
                }

                <TouchableOpacity  onPress={()=>handleLogout()} style={styles.item}>
                    <Text style={{color:'red',fontSize:18}}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>setremoveAccountDialog(true)} style={styles.item}>
                    <Text style={{fontSize:18}}>Eliminar cuenta</Text>
                </TouchableOpacity>
                <DialogInput isDialogVisible={nickDialog}
                            title={"Cambiar Nick"}
                            message={"Escribe el nick que quieres mostrar"}
                            hintInput ={"Riddick"}
                            submitInput={ (text) => {updateUserName(text)} }
                            closeDialog={ () => {handleNickDialog()}}>
                </DialogInput>
                <DialogInput isDialogVisible={removeAccountDialog}
                            title={"Confirmacion"}
                            message={"Escribe tu contraseña para confirmar el borrado"}
                            submitInput={ (text) => {deleteAccount(text)} }
                            closeDialog={ () => {setremoveAccountDialog(false);}}>
                </DialogInput>
            
            </View>
    )
}
 

export default SettingsScreen
const styles = StyleSheet.create({
    constainer:{
        flex:1,
  
    },
    settingHeader:{
        padding:15,
        justifyContent:'center',
        alignItems:'center',
    },
    avatar:{
        height: 90,
        width: 90,
        borderRadius: 60,
        borderWidth:2,
        borderColor:'lime',
        
        
    },
    item:{
     
        paddingVertical:15,
        paddingHorizontal:5,
        borderBottomColor:'rgb(0, 177, 106)',
        borderBottomWidth:2,
  
    },
    itemText:{
        textAlign:'center',
        paddingVertical:5,
        fontSize:22,
        marginRight:15
     
        
    },
    nickbar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }
})
