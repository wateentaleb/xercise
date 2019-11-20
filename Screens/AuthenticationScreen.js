import React from 'react';
import {StyleSheet, View, Text,Image,TouchableOpacity,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';

import Main from './MainScreen'

export default class AuthenticationScreen extends React.Component{

    constructor(props) {
        super(props);
        this.unsubscriber = null;
        //this.focusNextField = this.focusNextField.bind(this);
        // need to put this for the fb function or it wont let the this.props shit work
        this.logInWithFacebook = this.logInWithFacebook.bind(this);
        this.firebaseTest = this.firebaseTest.bind(this);
        this.inputs = {};
        this.state = {
            email: "",
            password: "",
            errorMessage: null,
            new_user:"",
            LED_STATUS:"",

        };
    }



    static navigationOptions = {
        header: null
    };

    async logInWithFacebook(){

            try {
                await Facebook.initializeAsync('978915192468343');
                const {
                    type,
                    token,
                    expires,
                    permissions,
                    declinedPermissions,
                } = await Facebook.logInWithReadPermissionsAsync({
                        permissions: ['public_profile', 'email'], behavior : "web",
                    });

                // } = await Facebook.logInWithReadPermissionsAsync('978915192468343', {
                //     permissions: ['public_profile', 'email'], behavior : "web",
                // });

                if (type === 'success' && token) {

                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email`);
                    const credential = firebase.auth.FacebookAuthProvider.credential(token);
                    const {picture,name,email} = await response.json();
                    const facebookProfileData = await firebase
                        .auth()
                        .signInWithCredential(credential).then(
                            (res) => {
                                firebase.database().ref('users/'+ res.user.uid).set({
                                    name: name,
                                    email: email,
                                    age: 'null',
                                    pictureUrl: picture,
                                    workoutType:'empty',
                                    medication: 'empty',
                                    locationToken: 'empty',
                                    notificationToken:'empty',
                                    new_user:'true',
                                    gender:"empty",
                                    height:"empty",
                                    weight:"empty",
                                    pageNum:0,
                                    workoutsCompleted:0,
                                    distanceCompleted:0,
                                    unit:"",
                                    numExercise:0,
                                    previousWorkout:"none",
                                    pitch:0,
                                    roll:0,
                                    Gx:0,
                                    Gy:0,
                                    Gz:0,
                                    Ax:0,
                                    Ay:0,
                                    Az:0,
                                    

                                });
                                this.firebaseTest = this.firebaseTest.bind(this);
                                var userID = firebase.auth().currentUser.uid;



                                // UNCOMMENT BELOW CODE

                                database = firebase.database();

                                var ref = database.ref('users/' + userID + '/new_user');
                                const val2 = ref.on("value", snapshot => {
                                    this.setState({ new_user: snapshot.val() })
                                });
                                // if the user is new, then we need to put onto onboarding
                                if (this.state.new_user ==="true"){
                                    this.props.navigation.navigate('OnBoarding')
                                }
                                else {
                                    this.props.navigation.navigate('Main')
                                }
                            }

                        )
                } else {
                    // type === 'cancel'
                }
            } catch ({ message }) {
                alert(`Facebook Login Error: ${message}`);
            }


    }

    //firebase test
    firebaseTest(){

        //void setString(const String &path, const String &value)
        var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        let ref = database.ref('users/' + userID + '/LED_STATUS');
        const led = ref.on("value", snapshot => {
            this.setState({LED_STATUS: snapshot.val() })
        })
        let userRef = database.ref('users/' + userID);

        if(this.state.LED_STATUS === 'OFF'){
            let userRef = database.ref('users/' + userID);
            userRef.update({'LED_STATUS':'ON'});
            this.setState({LED_STATUS:'ON'})

        }
        else{
            let userRef = database.ref('users/' + userID);
            userRef.update({'LED_STATUS':'OFF'});
            this.setState({LED_STATUS:'OFF'})

        }
        // userRef.update({'LED_STATUS':'ON'});

         // if(this.state.LED_STATUS === "OFF"){
         //     ref.update({LED_STATUS: "ON"});
         // }
         // else{
         //    ref.update({LED_STATUS: "FALSE"});
         // }

    }

    componentDidMount() {
        database = firebase.database();
    }

    render() {
         return(
        <LinearGradient
            style={styles.container}
            colors={['#2C5364','#203A43','#0F2027' ]}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
        >
                 <View style={styles.image}>
                 <Image source={require('../assets/logo_new.png')} style = {styles.logo} />
                 </View>
                 <View style={styles.title}>

                     <Text style={styles.titleText}> Welcome </Text>

                     <View style={{marginTop:2}}/>

                     <View style={styles.subtitleView}>
                     {/*<Text style={styles.signuptxt}>Sign Up to continue</Text>*/}
                     {/*    Seamlessly track your workouts {"\n"}  with the Xercise device and {"\n"} improve your fitness training!*/}
                         <Text style={styles.subtitle}> Seamlessly track your workouts  </Text>
                         <View style={{marginTop:4}}/>
                         <Text style={styles.subtitle}> with the Xercise band and </Text>
                         <View style={{marginTop:4}}/>
                         <Text style={styles.subtitle}> improve your fitness training!  </Text>
                     </View>
                 </View>


                 <View style={styles.buttonView}>
                     <TouchableOpacity onPress={this.logInWithFacebook} style={styles.facebookBtn}>
                         <Text style={styles.facebookTxt}> Login in with Facebook</Text>
                     </TouchableOpacity>
                     <View style={{marginTop:20}}/>

                     <LinearGradient
                         start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                         colors={['#4858CF',  '#FDC830']}
                         style={styles.register}>
                         <TouchableOpacity onPress={this.firebaseTest}>
                             {/*<Text style={styles.registerTxt}> Sign Up</Text>*/}
                             <Text style={styles.registerTxt}> Sign in </Text>
                         </TouchableOpacity>
                     </LinearGradient>


                 </View>

                 <View style={{top:'40%',width:"100%",height:"5%",flexDirection:'row', justifyContent:'center',}}>
                 {/*<View style={{borderColor:'blue',borderWidth:2,top:'40%',width:"100%",height:"5%",flexDirection:'row', justifyContent:'center',}}>*/}
                <Text style={{justifyContent:'flex-start',fontFamily:'Rubik-Light', fontSize:14, color:'#FDC830'}}> Don't have an account?</Text>
                     <TouchableOpacity style={styles.registerBtn}>
                        <Text style={styles.signUptxt}> Sign up Here!</Text>
                     </TouchableOpacity>
                 </View>

        </LinearGradient>
         );
     }
}
const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      paddingTop: 20,
      paddingBottom:20,
      paddingLeft: 20,
      paddingRight:20,
      backgroundColor: '#F5F4F9',
  },
    logo:{

        width: "70%",
        height: "100%",
        borderWidth: 1,
        borderColor:'transparent',
        borderRadius: 10,
        left:"-40%",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    image:{
      width:"100%",
        height:"10%",
        top:"-20%",
        left:"2%",
      flexDirection: 'row',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },
    titleText:{
        color:'white',
        fontFamily:'Rubik-Light',
        fontSize:45,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android

    },
    title:{
      width:"100%",
        height:"15%",
        top:"-8%",
        left:"0%",
        flexDirection: 'column',

    },
    signuptxt:{
        color:'white',
        fontFamily:'Rubik-Light',
        fontSize:15,
        left:"3%"
    },
    buttonView:{
      // borderColor: 'red',
      //   borderWidth:3,
        height:"30%",
        width:"100%",
        top:"25%",
        alignItems: 'center',
        flexDirection:'column',

    },

    facebookBtn:{
      justifyContent:'center',
        alignItems:'center',
      top: "5%",
      borderWidth:1,
        backgroundColor: '#3b5998',
        width:"90%",
        height:"25%",
        borderRadius: 30,
        borderColor:'transparent',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS

    },

    facebookTxt:{
      fontFamily:'Rubik-Medium',
        color:'white',
        fontSize:15,
    },
    register:{
        justifyContent:'center',
        alignItems:'center',
        top: "1%",
        borderWidth:1,
        width:"90%",
        height:"25%",
        borderRadius: 30,
        borderColor:'transparent',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS

    },
    registerTxt:{
        fontFamily:'Rubik-Medium',
        color:'white',
        fontSize:15,
    },

    registerBtn:{
      justifyContent:'flex-end',
        top:'-5%'
    },

    signUptxt:{
      fontFamily:'Rubik-Medium',
        color:'#FDC830',
        fontSize:14,
        top:"-12%"

    },
    subtitleView:{
        width:"100%",
        height:"150%",
        top:"50%",
        left:"0%",
    },
    subtitle:{
        color:'white',
        fontFamily:'Rubik-Light',
        fontSize:23,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
    },


});