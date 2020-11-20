 import React, { useState } from 'react'
 import { StyleSheet, Text, View, TouchableHighlight, Modal, TouchableWithoutFeedback,Image} from 'react-native'
 import { Icon } from 'react-native-elements'
 import Logo from '../assets/img/logo-white.png';
import HelpScreen from '../screens/auxiliar/HelpScreen';
 
 const Header = (props) => {
     const [showHelp, setshowHelp] = useState(false)
    const handleShowHelp= ()=>{setshowHelp( !showHelp ? true : false );}
    
    // logout, salir grupo, cambiar displayname, cambiar foto,eliminar cuenta,desactivar notificaciones,retroceder,
    
    return (
         <View style={styles.container}>
             <View style={{  flexDirection: 'row',alignItems:'center'}}>
              <Image source={Logo} style={styles.logo}/>
            <Text style={{color:'#fff',fontFamily:'goldman',fontSize:20,marginTop:5}}>SAFEHOOD</Text>
            </View>
            <TouchableHighlight style={styles.icon} onPress={()=>handleShowHelp()}>
                <Icon name='flag' color='#ffff' />
            </TouchableHighlight>
            <Modal visible={showHelp} >
               <HelpScreen />
               <TouchableWithoutFeedback style={styles.closeModal} onPress={()=>handleShowHelp()} >
                    <Text style={styles.closeText}> Cerrar</Text>
               </TouchableWithoutFeedback>
            </Modal>
           
         </View>
         
     )
 }
 
 export default Header
 //
 const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: 'rgb(0, 177, 106)',
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 10,
        paddingRight: 10
    },
    textHeader:{ 
        color:'white',
        fontSize:21,
        fontWeight:'bold',
        fontFamily:'goldman'
    },
    modalHeader:{
        backgroundColor:'lightgrey',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    closeModal:{
        paddingVertical:10,
        backgroundColor:'white',
    },
    closeText:{textAlign:'center',fontFamily:'goldman',fontSize:20,color:'rgb(0, 177, 106)'},
     logo:{
        resizeMode:'contain',
        height:20,
        width:20,
        marginHorizontal:6
    
    }

})
 