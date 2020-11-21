import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Modal, TextInput, Alert,Image, ActivityIndicator, } from 'react-native'

import { Icon } from 'react-native-elements'
import street from '../../assets/img/street.png'
import help from '../../assets/img/help.png'
import elect from '../../assets/img/electricidad.png'
import megafono from '../../assets/img/altoparlante.png'
import suspect from '../../assets/img/suspect.png'
import siren from '../../assets/img/sirena.png'
import violence from '../../assets/img/violence.png'
import thief from '../../assets/img/thief.png'
import idea from '../../assets/img/idea.png'
import report from '../../assets/img/report.png'
import {postNewAlert} from '../../reducers/alertsSlice'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Selecciona Imagen ',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    chooseFromLibraryButtonTitle:'Abrir Galeria',
    takePhotoButtonTitle:'Hacer foto',
    mediaType:'photo'
  };


export default AlertsScreen=()=> {
  
  const navigation = useNavigation();

  const { user,group } = useSelector(state => state);
  const dispatch = useDispatch()
const [showLoaded, setshowLoaded] = useState(true)
  const [alertType, setalertType] = useState('none')
  const [alertMessage, setalertMessage] = useState()
  const [modalVisible, setmodalVisible] = useState(false)
    const [imageData, setimageData] = useState(null)

  const handleModal = () =>  setmodalVisible(!modalVisible)

const getImageAlert=()=>{
  ImagePicker.showImagePicker(options, async (response) => {
        
    if (response.didCancel) {
        return 
    } else if (response.error) {
        return  Alert.alert('Error','Ha ocurrido un error: ' +response.error);
    } else {
       setimageData(response) 
       setshowLoaded(false)
    }
  });

  return
}
  const postAlert = (type) => {
    if(alertMessage.length < 6 || alertMessage.length >120 ){
      return Alert.alert('Error','Solo texto entre 6 y 50 caracteres')
    }
 
    let alert= {
      groupId:group.id,
      data:{  
        uid:user.uid,
        time: Date.now(),
        message:alertMessage,
        type:alertType,
        photo:imageData || 'none'
      }
    }
    setshowLoaded(true)
    handleModal()
    dispatch(postNewAlert(alert))
    setimageData(null)
    navigation.navigate('Group',{screen:'Alertas'})
  }

    return (
      <ScrollView >
        <View style={styles.container}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri:group.photo}} style={{borderRadius:25, height:50, width:50,marginRight:15}} />
            <Text  style={styles.title}>{group.name}</Text>
          </View>
          <Text  style={styles.subtitle}>Avisos</Text>
          <View style={styles.buttonsView}>
        
          <TouchableOpacity style={[styles.button,styles.alert]} onPress={() => {handleModal();setalertType({type:'Robo',color:'rgb(246, 36, 89)'})}}  >
            <>
            <Image source={thief} height={80} style={{height:50,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textAlert]}>Robo</Text>
            </>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button,styles.alert]} onPress={() => {handleModal();setalertType({type:'Violencia',color:'rgb(246, 36, 89)'})}}  >
            <>
              <Image source={violence} height={80} style={{height:50,resizeMode:'contain',alignSelf:'center'}}/>
              <Text style={[styles.textButton,styles.textAlert]}>Violencia</Text>
            </>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button,styles.alert]} onPress={() => {handleModal();setalertType({type:'Urgencia',color:'rgb(246, 36, 89)'})}}  >
          <>
            <Image source={siren} height={80} style={{height:50,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textAlert]}>Urgencia</Text>
            </>
          </TouchableOpacity>
       
          <TouchableOpacity onPress={() =>{handleModal();setalertType({type:'Sospecha',color:'rgb(248, 148, 6)'})}} style={[styles.button,styles.warn]} >
          <>
            <Image source={suspect} height={80} style={{height:40,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textWarn]}>Actividad Sospechosa</Text>
            </>
          </TouchableOpacity>
          
   



          <TouchableOpacity onPress={() =>{handleModal();setalertType({type:'Suministro',color:'rgb(248, 148, 6)'})}} style={[styles.button,styles.warn]} >
            <>
            <Image source={elect} height={80} style={{height:40,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textWarn]}>Corte Suministro</Text>
            </>
          </TouchableOpacity>
          
     

          
          <TouchableOpacity onPress={() =>{handleModal();setalertType({type:'Vial',color:'rgb(248, 148, 6)'})}} style={[styles.button,styles.warn]} >
            <>
            <Image source={street} height={80} style={{height:50,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textWarn]}>Vial</Text>
            </>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>{handleModal();setalertType({type:'Idea',color:'rgb(0, 177, 106)'})}} style={[styles.button,styles.report]} >
            <>
            <Image source={idea} height={80} style={{height:50,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textReport]}>Idea</Text>
            </>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>{handleModal();setalertType({type:'Ayuda',color:'rgb(0, 177, 106)'})}} style={[styles.button,styles.report]} >
            <>
            <Image source={help} height={80} style={{height:50,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textReport]}>Ayuda</Text>
            </>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() =>{handleModal();setalertType({type:'Report',color:'rgb(0, 177, 106)'})}} style={[styles.button,styles.report]} >
            <>
            <Image source={report} height={80} style={{height:50,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={[styles.textButton,styles.textReport]}>Reporte</Text>
            </>
          </TouchableOpacity>

        </View>
        <Modal visible={modalVisible} >
          <View style={{flex:1,justifyContent:'space-between'}}>
            <View>
            <Image source={megafono} style={styles.modalImage}/>
                <Text style={styles.modalTitle}>Estas enviando un aviso de: {alertType.type}</Text>
             
                <TouchableOpacity  onPress={() => getImageAlert()}  style={{justifyContent:'center',alignItems:'center',borderColor:'rgba(0, 177, 106, 1)',borderWidth:3,width:200,alignSelf:'center',marginVertical:40,paddingVertical:15}}>
                  
                  < View style={{justifyContent:'center',alignItems:'center'}}>
                    <Icon name="camera" color="rgba(0, 177, 106, 1)" size={50}  type='font-awesome'/>
                    <Text style={{color:'rgba(0, 177, 106, 1)',fontFamily:'goldman',fontSize:18}}>Añadir Imagen</Text>
                    <Icon size={30} name="done" color="rgba(0, 177, 106, 1)" disabled={showLoaded} disabledStyle={{display:'none'}}/>
                </View>
                </TouchableOpacity>
               
                <TextInput multiline={true} placeholder="Sucede algo..." style={{margin:10,borderRadius:5,borderWidth:1, borderColor:'gray'}} onChangeText={(text) => setalertMessage(text)} />
           
                <TouchableOpacity  onPress={() => postAlert()} style={{backgroundColor:'rgba(0, 177, 106, 1)', paddingVertical:10,width:300,alignSelf:'center',borderRadius:5,}}>
                    <Text style={{textAlign:'center',fontWeight:'bold',color:'white'}}>Enviar</Text> 
            </TouchableOpacity>
            </View>
            <TouchableOpacity  onPress={() => handleModal()} style={{backgroundColor:'gray', paddingVertical:10}}>
                    <Text style={{textAlign:'center',fontWeight:'bold',color:'white'}}>Cancelar</Text> 
            </TouchableOpacity>
      
          </View>
        </Modal>
      </View>
      </ScrollView>
    )
  
}

const styles = StyleSheet.create({
  container:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',

  },
  title:{
    fontSize:20,
    paddingVertical:10,
    marginTop:10,
    color:'rgb(0, 177, 106)',
    fontFamily:'goldman'
  },
  subtitle:{ 
    fontSize:20,
    color:'rgb(0, 177, 106)',
    fontFamily:'goldman'
  },
  buttonsView:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:"center",
    alignItems:'center',
  },
  alert:{
    borderColor:'rgb(246, 36, 89)',
  },
  report:{
    borderColor:'rgb(0, 177, 106)',
  },
  warn:{
    borderColor:'rgb(248, 148, 6)',
  },
  button: {
    color: '#fff',
    justifyContent: 'center',
    borderWidth:2,
    alignItems: 'center',
    height: 99,
    width: 99,
    borderRadius: 24,
    margin: 10
  },
  textButton:{fontWeight:'bold',textAlign:'center'},
  textAlert:{color:'rgb(246, 36, 89)'},
  textWarn:{color:'rgb(248, 148, 6)'},
  textReport:{color:'rgba(0, 177, 106, 1)'},
  modalTitle:{
    padding:10,
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'sans-serif-medium',
    fontWeight:'bold',
    fontSize:20,
  },
  modalImage:{
    height:80,
    width:80, 
    borderWidth:1,
    borderRadius:64,
    borderColor:'rgba(0, 177, 106, 1)',
    alignSelf:'center',
    marginTop:20,
  }
})
