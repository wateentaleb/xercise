import React, { Component } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {AntDesign} from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';


export default class AccountSettings extends React.Component {

    static navigationOptions = {

        header: null,

    };

    constructor(props) {
        super(props);
        constructor(props)
        {


            // this.gotData = this.gotData.bind(this);
            super(props);
            // this._checkUserType = this._checkUserType.bind(this);
            this.state = {
                newUser: 'false',
                animation: null,
                picture: "",
                name: "",
                day: "",
                month: "",
                year: "",
                distanceRan: 0,
                weight: 0,
                workoutsCompleted: 0,
                previousWorkout: "",
                numExercise: 0,


                // progress: new Animated.Value(0),
                // progress: new Animated.Value(0),
                // userInfo: this.props.navigate.state.params.userInfo,
            }


            this.mainScreen = this.mainScreen.bind(this);
        }
    }

    mainScreen(){
        this.props.navigation.navigate('Main');
    }

    componentDidMount() {
        database = firebase.database();
        // var userID = firebase.auth().currentUser.uid;
         var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        var ref = database.ref('users/' + userID + '/pictureUrl/data/url');
        const val1 = ref.on("value", snapshot => {
            this.setState({ picture: snapshot.val() })
        })

        var ref = database.ref('users/' + userID + '/name');
        const name = ref.on("value", snapshot => {
            this.setState({ name: snapshot.val() })
        })
    }

    render() {
        return (
            <LinearGradient colors={['#EAEAF3', '#EAEAF3']} style={styles.container}>

                {/*this will be the blue gradient header*/}
                <LinearGradient colors={['#2D3251','#333B6A','#3A4484']} style={styles.header}>

                <AntDesign onPress={this.mainScreen} style={styles.arrow} name="arrowleft" size={20} color="#a6a6a6" />


            </LinearGradient>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: this.state.picture }}  resizeMode="contain" />
                </View>

                <View style={styles.rectangle}/>

                <Text style={styles.nametxt}> {this.state.name} </Text>
                <Text style={styles.completedtxt}> 30% completed </Text>
                <Text style={styles.subtitletxt}> Current Plan </Text>
                <Text style={styles.plantxt}> {`The Complete 4-week\n Beginner Plan`} </Text>
                <View style={styles.bar}/>

                {/*BELOW HEADER SAME BOXES AS DASHBOARD */}
                {/*<View style={styles.infoContainer}>*/}
                {/*<View style={styles.workoutbox}>*/}
                {/*    <View style={{marginTop:"5%"}}/>*/}
                {/*    <Text style={styles.numtxt}> {this.state.workoutsCompleted} </Text>*/}
                {/*    <View style={{marginTop:"5%"}}/>*/}
                {/*    <Text style={styles.worktxt}> workouts </Text>*/}
                {/*</View>*/}
                {/*<View style={styles.runbox}>*/}
                {/*    <View style={{marginTop:"5%"}}/>*/}
                {/*    <Text style={styles.numtxt}> {(this.state.distanceCompleted) + ((this.state.unit === 'english')? " mile":" km")} </Text>*/}
                {/*    <Text style={styles.destxt}> distance ran </Text>*/}
                {/*</View>*/}
                {/*<View style={styles.weightbox}>*/}
                {/*    <View style={{marginTop:"5%"}}/>*/}
                {/*    <View style={{marginRight:"20%"}}/>*/}
                {/*    <Text style={styles.numtxt}> {(this.state.weight)}</Text>*/}
                {/*    <Text style={styles.weighttxt}> current weight </Text>*/}
                {/*</View>*/}
                {/*</View>*/}

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
        zIndex:5,
        alignItems: 'center',
        top:"0%",
        width:"100%",
        height:"46%",
        opacity:0.75,
    },
    arrow:{
        zIndex:10,
        top:'18%',
        left:'-40%',
        color:"white",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    img:{
        flex:1,
        width:undefined,
        height:undefined,
    },
    imgContainer:{
        zIndex:-1,
        justifyContent:'center',
        top:'-52%',
        width:'100%',
        height:'150%',
        position:'absolute',
    },
    rectangle:{
       height:"48%",
        width:"25%",
        backgroundColor:'#3063EE',
        opacity:0.6,
        top:"-48%",
        left:'-38%',

    },
    nametxt:{
        zIndex:5,
        top:'-75%',
        fontFamily: 'Rubik-Regular',
        fontSize: 30,
        color:'white',
        left:'-10%',
    },
    completedtxt:{
        opacity:0.6,
        zIndex:5,
        top:'-58%',
        fontFamily: 'Rubik-Regular',
        fontSize: 12,
        color:'white',
        left:'-20%',
    },
    bar:{
        zIndex:10,
        height:2,
        width:"25%",
        backgroundColor:'#3063EE',
        opacity:0.6,
        top:"-65%",
        left:'-38%',

    },
    subtitletxt:{
        opacity:0.6,
        zIndex:5,
        top:'-70%',
        fontFamily: 'Rubik-Regular',
        fontSize: 12,
        color:'white',
        left:'-22%',
    },
    plantxt:{
        zIndex:5,
        top:'-69%',
        fontFamily: 'Rubik-Medium',
        fontSize: 20,
        color:'white',
        left:'-4%',
    },
    workoutbox: {
        // top: "5.05%",
        right: "35%",
        width: 132,
        height: 100,
        borderWidth: 0.8,
        borderColor: '#cccccc',

        alignItems: 'center',
    },
    runbox: {
        // top: "-7.25%",
        width: 132,
        height: 100,
        borderWidth: 0.8,
        borderColor: '#cccccc',
        alignItems: 'center',

    },
    weightbox: {
        // top: "-19.6%",
        right: "-35%",
        width: 132,
        height: 100,
        borderColor: '#cccccc',
        borderWidth: 0.8,
        alignItems: 'center',

    },
    numtxt: {
        marginTop: 15,
        fontFamily: 'Questrial',
        fontSize: 28,
        marginLeft: 5,

    },
    worktxt: {
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        marginTop: 5,
        marginLeft: 5,

    },
    infoContainer: {
        justifyContent: 'center',
        alignItems:'center',
        top:'20%',
        borderColor:'red',
        borderRadius:5,
        height:'25%',
        width:"100%",


    },
});