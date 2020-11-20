import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableHighlight, Image} from 'react-native'
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import image from '../../assets/img/noGroup2.jpg'
import people from '../../assets/img/people.png'
import alertas from '../../assets/img/Alertas.png'
import entrar from '../../assets/img/entrar.png'




const ButtonsNavScreen =(props)=> {
    
    const {group} = useSelector(state => state)
    
    
    return  (<View style={{flex:1,backgroundColor:'#ffff'}} >
                <Header />
                {group.exists ? 
                    (<View style={styles.container}>
                        <TouchableHighlight onPress={()=>props.navigation.navigate('Alertas')} style={styles.button} >
                            <>
                            <Image source={alertas} style={{height:70,width:70}}/>
                            <Text style={styles.text}> Alertas</Text>
                            </> 
                        </TouchableHighlight>
                        <TouchableHighlight  onPress={()=>props.navigation.navigate('Usuarios')} style={styles.button}>
                            <>
                            <Image source={people} style={{height:70,width:70}}/> 
                            <Text style={styles.text}> Usuarios</Text>
                            </>
                        </TouchableHighlight>
                          
                        {group.isAdmin &&
                        <TouchableHighlight onPress={()=>props.navigation.navigate('Peticiones')} style={styles.button} >
                            <>
                            <Image source={entrar} style={{height:70,width:70}}/>
                            <Text style={styles.text}> Solicitudes</Text>
                            </>
                        </TouchableHighlight>  
                        }
                    </View>)
                    :
                    (<View style={styles.container}>
                        <Image source={image} style={styles.image} />
                        <Text style={styles.text}>No tienes grupo</Text>
                    </View>)
                }
                </View>)
                
 

     
                
    }
  

export default ButtonsNavScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        height:140,
        width:190,
        margin:7,   
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor:'rgba(0, 177, 106, 1)',
        borderRadius: 24,
    },
    image: {
        resizeMode:'contain',
        justifyContent: "center",
        alignItems:'center',
        height:300,
        width:200
      },
      text:{
          color:'rgba(0, 177, 106, 1)',
          fontSize:24,
          fontFamily:'goldman'

      }
})
