import React, { Component ,useState} from 'react'
import { Text, StyleSheet, View,Modal,TouchableHighlight,ScrollView,TextInput,FlatList, Alert,Image,TouchableOpacity } from 'react-native'
import { useSelector,useDispatch } from "react-redux";
import { createNewGroup} from '../../reducers/groupSlice';
import {fetchStreetsByCode, fetchGroupsbyStreet, sendJoinRequest} from '../../reducers/searchGroupsSlice'
import simage from '../../assets/img/sgroup.jpg'
import cimage from '../../assets/img/noGroup.jpg'
import anon from '../../assets/img/anon.png'
import geojson from '../../coordinates.json';
export default GroupsScreen =()=>{

  const dispatch = useDispatch()
   /** Modals */
  const [showJoin, setshowJoin] = useState(false)
  const [showCreate, setshowCreate] = useState(false)
  const [showStreets, setshowStreets] = useState(false)
  /*inputs */
  const [sZCode, setsZCode] = useState()
  const [cZCode, setcZCode] = useState()
  const [groupName, setgroupName] = useState()
  const [streetName, setstreetName] = useState()
  const [numberFrom, setnumberFrom] = useState()
  const [numberTo, setnumberTo] = useState()


  /*Flatlist arrays */
  const [postalStreets, setpostalStreets] = useState()
  const [streetGroups, setstreetGroups] = useState()


  const { user,group} = useSelector(state => state);
    
  
  

    /* Handling Modals */

    const handleCreateModal= ()=>{
      if(!user.name){ return Alert.alert('No tienes Nick','Necesitas un nombre antes unirte a a un grupo, ve a Ajustes')}
      setshowCreate(!showCreate)
    };

    const handleJoinModal= ()=>{
      if(!user.name){return Alert.alert('No tienes Nick','Necesitas un nombre antes unirte a a un grupo, ve a Ajustes')}
      setshowJoin(!showJoin)
    };

    const handleStreetsModal= ()=>setshowStreets(!showStreets);



    /**Alert */

    const showAlert= (error)=>Alert.alert(`${error}`);

  
    /** Creating a group */

 
    const createGroup = async () =>{
     
      if(groupName ==null || groupName.length < 5 || groupName.length >= 25){showAlert('Nombre de Grupo entre 5 y 25 carateres');return}
      if(cZCode ==null || cZCode.length != 5){showAlert('Código postal vacio o incorrecto');return}
      if(streetName ==null || streetName.length < 4 || streetName.length >= 25){ showAlert('Nombre calle vacio o inferior a 4');return;}
      if(numberFrom ==null || numberFrom.toLocaleString().length > 3){showAlert('Número inicio incorrecto');return}
      if(numberTo ==null || numberTo.toLocaleString().length > 3){showAlert('Número fin Incorrecto');return}
      if(numberTo ==numberFrom  ){showAlert('Los numeros no deben ser identicos');return}

      let codeExists =  geojson.find(elem=>elem.code==cZCode)

    if(!codeExists){return Alert.alert('Error','Codigo postal no existe')}

     let createdGroup ={
         zCode:cZCode,
         street:streetName,
         name:groupName,
         numbers:{
            from: numberFrom,
            to: numberTo,
         },
         users:{},
         photo:'none'
      }

     let userName = user.name
     let userFoto = user.photo || 'none';
     let userData={
       name: userName,
       photo: userFoto ,
       role:'admin'
     }

     createdGroup.users[user.uid]=userData;
    dispatch(createNewGroup({group:createdGroup,uid:user.uid}))
    handleCreateModal()  
    
   }

   
   
    /**Groups Search */

    const searchStreetsbyCode =()=>{
      if( !sZCode || sZCode.length<5 || isNaN(sZCode)){ return Alert.alert('Codigo Erroneo','Verifica que el numero del codigo postal sea correcto')}
    
      dispatch(fetchStreetsByCode(sZCode)).then(data=>{
          if(data.payload.length>0){
           
           setpostalStreets(data.payload);
           handleStreetsModal()

           } else{
              Alert.alert('Sin Grupos','No hay grupos registrados en esta zona')
          }
      })
    };

    const searchGroupsbyStreet=(street)=>{
      setstreetName(street)
      dispatch(fetchGroupsbyStreet(street)).then(data=>{ 
        setstreetGroups(data.payload)
        handleStreetsModal()
        handleJoinModal()
      })

    }
   
    
    
    /* Groups Render*/

   const renderStreetGroups=({item})=>{
 
      return (<TouchableOpacity style={styles.item} onPress={()=>confirmJoining(item.id)}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>  
                  {item.photo != 'none' ? (<Image source={{uri:item.photo}} style={styles.avatar}/>): (<Image source={anon} style={styles.avatar}/>)}
                  <View style={{   flex:1}}>
                    <Text style={styles.itemText}> {item.name}</Text>
                    <Text style={{textAlign:'right',marginTop:6,marginRight:5,color:'#fff'}}>Nº  {item.numbers.from +' al '+ item.numbers.to} -- Usuarios: {item.users}</Text>
                  </View>
                </View>
              </TouchableOpacity>)
   }

   const renderPostalStreets=({item})=>{
      return(<TouchableOpacity style={styles.item} onPress={()=>searchGroupsbyStreet(item)}>
        <Text style={{textAlign:'center',fontWeight:'bold', textTransform:'uppercase',color:'#fff'}}> {item}</Text>
        </TouchableOpacity>)
   }


   ///Joining a Group - confirm, then send request



   const tryJoinRequest = async (groupId)=>{  
      let requestData={
        groupId:groupId,
        userId:user.uid,
        photo:user.photo || 'none',
        name:user.name
      }
      dispatch(sendJoinRequest(requestData)).then(()=>Alert.alert('Message','Solicitud enviada correctamente'))//
      setshowJoin(!showJoin)
    }

    const   confirmJoining= (groupId) =>{
      
      Alert.alert(
        "Unirse a Grupo",
        "¿Desea enviar solicitud a este grupo para unirse?",
        [
          {
            text: "Sí",
            onPress: () =>tryJoinRequest(groupId) ,
            style:"destructive",
          },
        ],{cancelable:true}
      );
  }
  
    return (
      <ScrollView >    
      <View style={styles.container}>
            <View style={{marginTop:20}}>
              <Image source={simage} style={styles.image}/>
                <TextInput style={styles.input} placeholder="Código postal" value={sZCode} keyboardType="numeric" autoCapitalize='none'  onChangeText={(text)=>setsZCode(text)} />              
                <TouchableHighlight onPress={searchStreetsbyCode} style={styles.button}>
                  <Text style={styles.mainButtonsText}>Buscar grupos</Text>
                </TouchableHighlight>
            </View>

            <View>
              <Image source={cimage} style={styles.image}/>
              <TouchableHighlight style={styles.button} onPress={handleCreateModal}>
                <Text style={styles.mainButtonsText}>Crear Grupo</Text>
              </TouchableHighlight>
            </View>


            <Modal visible={showStreets}>
              <Text style={styles.modalTitle}>Calles con grupo en: {sZCode} </Text>
              <FlatList 
                data={postalStreets}
                keyExtractor={(item, index) => `group-${index}`}
                renderItem={renderPostalStreets}
              />
              <TouchableOpacity onPress={()=>handleStreetsModal()} style={{backgroundColor:'lightgreen',paddingVertical:15}}> 
                <Text style={{textAlign:'center',fontWeight:'bold'}}>Volver</Text>
              </TouchableOpacity>     
            </Modal>

            <Modal visible={showJoin} style={styles.container}>
                <Text style={styles.modalTitle}>Grupos en:  {streetName}</Text>
                <FlatList 
                  data={streetGroups}
                  keyExtractor={(item, index) =>item.id}
                  renderItem={renderStreetGroups}  
                />
                <TouchableOpacity onPress={()=>handleJoinModal()} style={{backgroundColor:'lightgreen',paddingVertical:15}}> 
                <Text style={{textAlign:'center',fontWeight:'bold'}}>Volver</Text>
              </TouchableOpacity>   
            </Modal>
            
            <Modal visible={showCreate}  style={styles.modalCreate}>
            
                <Text style={styles.modalTitle}>Creando Grupo de Vigilancia</Text>
                <View style={{padding:15}}>
                    <View style={{marginVertical:10}}>
                        <Text style={styles.textGuide}>1- Escribe un nombre para el grupo</Text>
                        <TextInput   style={styles.inputNames} placeholder="Marvel Defenders" autoCapitalize='none'  onChangeText={(text)=>setgroupName(text)} />
                    </View>
                    <View style={{marginVertical:10}}>
                      <Text style={styles.textGuide}>2- Facilita un codigo postal</Text>
                      <TextInput   style={styles.inputNames} placeholder="12345" keyboardType="numeric" autoCapitalize='none'  onChangeText={(text)=>setcZCode(text)} />
                    </View>
                  
                    <View style={{marginVertical:10}}>
                      <Text style={styles.textGuide}>3- El nombre de la calle!</Text>
                      <TextInput   style={styles.inputNames} placeholder="Calle del ejemplo" autoCapitalize='none'  onChangeText={(text)=>setstreetName(text)} />
                    </View>
                    <Text style={styles.textGuide}>4- Escribe los numeros de la calle que crees podria abarcar tu grupo de Vigilancia</Text>
                    <View style={[styles.numberView,{marginVertical:10}]}>
                      <TextInput value={numberFrom}  style={{width:100,borderBottomWidth:1,textAlign:'center'}} placeholder="Desde" keyboardType="numeric"  onChangeText={(text)=>setnumberFrom(text)} />
                      <TextInput value={numberTo}   style={{width:100,borderBottomWidth:1,textAlign:'center'}} placeholder="Hasta" keyboardType="numeric" onChangeText={(text)=>setnumberTo(text)} />
                    </View>
                </View>
                <TouchableOpacity  onPress={()=>{createGroup()}} style={{backgroundColor:'rgba(0, 177, 106, 1)',paddingVertical:15,width:300,alignSelf:'center',marginVertical:10}}>
                    <Text style={{textAlign:'center',fontWeight:'bold',color:'#fff'}}>Crear</Text> 
                </TouchableOpacity>
          
              <TouchableOpacity onPress={()=>{handleCreateModal()}} style={{backgroundColor:'lightgray',paddingVertical:15,width:300,alignSelf:'center',marginVertical:10}}> 
                  <Text style={{textAlign:'center',color:'black',fontWeight:'bold'}}>Volver</Text>
              </TouchableOpacity>   
            </Modal>
          </View>
      </ScrollView> 
    )
  
}

const styles = StyleSheet.create({
  container:{  
    justifyContent:'center',
    alignItems:'center',
  },
  image:{
    resizeMode:'contain',
    height:150,
    width:150
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 150,
    marginLeft:10,
    borderWidth:1,
    borderColor:'black'
 
},
  mainButtonsText:{color:'#fff',textAlign:'center',fontWeight:'bold',fontSize:16},
  modal:{
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
  },
  modalCreate:{
    backgroundColor:'lightgray',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
    justifyContent:'space-around',
  },
  textGuide:{
fontSize:16
  },
  input:{
    borderWidth:1,
    marginBottom:5,
    textAlign:'center'
  },
  inputNames:{
    borderBottomWidth:1,
  },
  button:{
    backgroundColor:'rgba(0, 177, 106, 1)',
    paddingVertical:10,
    borderRadius:5,
  },
  numberView:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-around'
  },
  modalTitle:{
    padding:10,
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'sans-serif-medium',
    fontWeight:'bold',
    fontSize:20,
  },
  item:{
    paddingVertical:15,
    backgroundColor:'rgb(0, 177, 106)',
    borderRadius:10,
    margin:5,
    alignItems:'center'
  },
  itemText:{textAlign:'left',fontWeight:'bold', textTransform:'uppercase',marginLeft:5,color:'#fff'}

})
