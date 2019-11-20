import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {AntDesign} from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import * as firebase from "firebase";


export default class workoutScreen extends React.Component {

    static navigationOptions = {

         header: null,

    };

    constructor(props){
        super(props);
        this.mainScreen = this.mainScreen.bind(this);
    }

    mainScreen(){
        this.props.navigation.navigate('Main');


    }


    render() {
        return (
            <LinearGradient colors={['#EAEAF3', '#EAEAF3']} style={styles.container}>

                {/*this will be the blue gradient header*/}
              <LinearGradient colors={['#2D3251','#333B6A','#3A4484']} style={styles.header}>

                  <AntDesign onPress={this.mainScreen} style={styles.arrow} name="arrowleft" size={20} color="#a6a6a6" />

              </LinearGradient>


            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',

    },
    header:{
        alignItems: 'center',
        top:"0%",
        width:"100%",
        height:"25%",
    },
    arrow:{
        top:'25%',
        left:'-40%',
        color:"white",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    }

    });