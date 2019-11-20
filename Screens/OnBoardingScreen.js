
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight,Alert,ScrollView,SafeAreaView,Animated,TextInput,Dimensions,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Notifications } from 'expo';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as firebase from "firebase";
import * as Animatable from 'react-native-animatable';
import LottieView from "lottie-react-native";



const {width} = Dimensions.get('screen');
// in the video he hs minAge instead of minWeight
const segmentLength = 91;
const minWeight = 110;
const minHeight = 51;
const segmentWidth=2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const spacerWidth = (width - segmentWidth) / 2 ;
const ruleWidth = spacerWidth * 2 + (segmentLength - 1) * snapSegment;
const dataWeight = [...Array(segmentLength).keys()].map(i => i + minWeight);
const dateHeight = [...Array(segmentLength).keys()].map(i => i + minHeight);
const indicatorWidth = 100;
const indicatorHeight = 80;



const RulerWeight = () => {
    return <View style={styles.ruler}>
        <View style={styles.spacer}/>
        {dataWeight.map(i =>{
            const tenth = i % 10 === 0;
            return <View
                key={i}
                style={[
                    styles.segment,
                    {
                        backgroundColor: tenth ? 'turquoise' : '#ffffff',
                        height: tenth ? 40 : 20,
                        marginRight: i === dataWeight.length - 1 ? 0 : segmentSpacing

                    }
                ]}
            />
        })}

        <View style={styles.spacer}/>
    </View>


};

const RulerHeight = () => {
    return <View style={styles.ruler}>
        <View style={styles.spacer}/>
        {dataWeight.map(i =>{
            const tenth = i % 10 === 0;
            return <View
                key={i}
                style={[
                    styles.segment,
                    {
                        backgroundColor: tenth ? 'turquoise' : '#ffffff',
                        height: tenth ? 40 : 20,
                        marginRight: i === dataWeight.length - 1 ? 0 : segmentSpacing

                    }
                ]}
            />
        })}

        <View style={styles.spacer}/>
    </View>


};

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        paddingTop:25,
        paddingLeft:25,
        paddingRight:25,
        paddingBottom:25,
        zIndex:0,
    },
    image: {
        width: 320,
        height: 320,
        color:'black',
    },
    text: {
        top:"80%",
        color:'black',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
        fontSize:20,
        fontFamily: 'Rubik-Regular',
    },
    logo:{
        borderWidth: 1,
        borderColor:'transparent',
        borderRadius: 10,
        width:"100%",
        height:"100%",
        zIndex:-1,

    },
    animationContainer:{
        top:"25%",
        width:"90%",
        height:"40%",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'transparent',

    },
    animationContainerNotification:{
        top:"-20%",
        width:"90%",
        height:"40%",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'transparent',

    },
    animationContainerLocation:{
        top:"-15%",
        width:"90%",
        height:"40%",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'transparent',

    },
    ruler:{
        width: ruleWidth,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        flexDirection:"row",
    },
    segment:{
        width:segmentWidth,
    },
    scrollViewContainerStyleWeight:{
        justifyContent:'flex-end',
        top:"-90%",

    },
    scrollViewContainerStyleHeight:{
        justifyContent:'flex-end',
        top:"-80%"
    },
    weightTextStyle:{
        fontFamily: 'Questrial',
        fontSize:55,
        color:'white',
        top:"-45%",

    },
    segmentIndicatorWeigth:{
        top:"-38.5%",
        height: indicatorHeight,
        backgroundColor: '#FDC830',
    },
    segmentIndicatorHeigth:{
        top:"-40.5%",
        height: indicatorHeight,
        backgroundColor: '#FDC830',
    },
    spacer:{
        width: spacerWidth,
        backgroundColor: 'red'
    },
    notifBtnContainer:{
        width:"100%",
        height:"20%",
        top:"-30%",
    },
    locationBtnContainer:{
        width:"100%",
        height:"20%",
        top:"-25%",
    },


});




export default class OnBoardingScreen extends React.Component {
    scrollViewRefWeight = React.createRef();
    scrollViewRefHeight = React.createRef();


    constructor(props) {
        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        var userID = firebase.auth().currentUser.uid;
        database = firebase.database();
        let userRef = database.ref('users/' + userID);

        // this.gotData = this.gotData.bind(this);
        super(props);
        // this._checkUserType = this._checkUserType.bind(this);
        this.state = {
            name: "",
            isPageTwo:"false",
            show:"",
            unit:"empty",
            scrollXWeight: new Animated.Value(0),
            scrollXHeight: new Animated.Value(0),
            initialWeight:150,
            initialHeight:67,
            finalWeight:"",
            finalHeight:"",
            pageNumber:0,
            foot:"",
            inch:"",
            pressed:false,
        };

        this.textInputRefHeight = React.createRef();
        this.textInputRefWeigth = React.createRef();



        // insert the text of the age

        // ************************ WEIGHT ************************
        //listener that will get called everytime the scroll is scrolled
        this.state.scrollXWeight.addListener(({value}) => {
            // whever we receive an event we want to set the text

            var userID = firebase.auth().currentUser.uid;
            // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
            let userRef = database.ref('users/' + userID);

            if(this.textInputRefWeigth && this.textInputRefWeigth.current) {
                this.textInputRefWeigth.current.setNativeProps({
                    text: `${Math.round(value / snapSegment) + (this.state.unit === "english" ? minWeight : minWeight / 2)}` + ((this.state.unit === "english") ? " lbs" : " kg")
                });

                var result = `${Math.round(value/snapSegment) + (this.state.unit==="english"? minWeight: minWeight/2)}`;

                     userRef.update({weight:(`${Math.round(value / snapSegment) + 
                         (this.state.unit === "english" ? minWeight : minWeight / 2)}` + ((this.state.unit === "english") ? " lbs" : " kg"))});

            }



        });

        // ************************ hEIGHT ************************
        this.state.scrollXHeight.addListener(({value}) => {
            // whever we receive an event we want to set the text

            var userID = firebase.auth().currentUser.uid;
            // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
            let userRef = database.ref('users/' + userID);

            if(this.state.unit === 'english'){
               this.setState({foot:Math.floor(value/12).toString()});
              this.setState({inch:(value % 12).toString()});
            }


            if(this.textInputRefHeight && this.textInputRefHeight.current){
                this.textInputRefHeight.current.setNativeProps({

                    // need to change it so that if its in foot height that we gotta do some division
                    // there are 12 inches in a foot, meaning we need to divide by 12 ,
                    // the quotient of that result would be the feet portion and the inches would be the remainder

               // text: `${Math.round(value/snapSegment) + minHeight}`+ ((this.state.unit === "english") ? "in": "cm" )
                    text: `${Math.round(((this.state.unit === 'english')? Math.floor(value/(snapSegment * 12)):value/snapSegment)) + 
                    ((this.state.unit === 'english')? (Math.floor(minHeight/12)): (minHeight)) }`
                        + ((this.state.unit === "english") ? " ft " :"" )
                        + ((this.state.unit === "english") ? (`${(Math.round(value/snapSegment) + minHeight)%12 } in`): " cm" )

                });

                    userRef.update({height:(`${Math.round(((this.state.unit === 'english')? Math.floor(value/(snapSegment * 12)):value/snapSegment)) +
                            ((this.state.unit === 'english')? (Math.floor(minHeight/12)): (minHeight)) }`
                            + ((this.state.unit === "english") ? " ft " :"" )
                            + ((this.state.unit === "english") ? (`${(Math.round(value/snapSegment) + minHeight)%12 } in`): " cm" ))})

            }



        })
    }



    static navigationOptions = {

        // title: 'HealthU'
        header: null
    };

    firstAnimation = require('../animations/first');
    componentDidMount() {
        database = firebase.database();

        var userID = firebase.auth().currentUser.uid;
        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        // getting the name of the user
        var ref = database.ref('users/' + userID + '/name');
        const val2 = ref.on("value", snapshot => {
            this.setState({ name: snapshot.val() })
        });


        setTimeout(() => {
            if (this.scrollViewRefWeight && this.scrollViewRefWeight.current) {
                this.scrollViewRefWeight.current._component.scrollTo({
                    x: (this.state.initialWeight - minWeight) * snapSegment,
                    y: 0,
                    animated: true
                });
            }
        }, 1000);

        setTimeout(() => {
            if (this.scrollViewRefHeight && this.scrollViewRefHeight.current) {
                this.scrollViewRefHeight.current._component.scrollTo({
                    x: (this.state.initialHeight - minHeight) * snapSegment,
                    y: 0,
                    animated: true
                });
            }
        }, 1000);

    }

    femaleBtn = () =>{
        this.setState({pressed:true});
        database = firebase.database();

        // change uncomment the code below and remove the code below that,
        // hard coded the user id because we are currently working on this page

        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
       var userID = firebase.auth().currentUser.uid;
        // const genderFemaleRef = database.ref('users/'+userID+'/gender');
        let userRef = database.ref('users/' + userID);
        userRef.update({'gender': "female"})


    };

    maleBtn = () =>{
        database = firebase.database();

        // change uncomment the code below and remove the code below that,
        // hard coded the user id because we are currently working on this page

        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        var userID = firebase.auth().currentUser.uid;
        let userRef = database.ref('users/' + userID);
        userRef.update({'gender': "male"})



    };

    englishUnit = () => {
        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        var userID = firebase.auth().currentUser.uid;
        this.setState({unit:"english"});
        var userID = firebase.auth().currentUser.uid;
        let userRef = database.ref('users/' + userID);
        userRef.update({'unit':'english'});



    };

    metricUnit = () => {
        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        var userID = firebase.auth().currentUser.uid;
        this.setState({unit:"metric"});
        var userID = firebase.auth().currentUser.uid;
        let userRef = database.ref('users/' + userID);
        userRef.update({'unit':'english'});


    };

    //

    async onNotifPress () {

        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        var userID = firebase.auth().currentUser.uid;
        let userRef = database.ref('users/' + userID);
        userRef.update({'notificationToken': token});


    };

     onLocationPress = async() => {
         const {locationServicesEnabled} = await Location.getProviderStatusAsync();
         if (!locationServicesEnabled) {
             alert("Hey! You might want to enable location for the app, you're missing out");
         }
         const { status } = await Permissions.askAsync(Permissions.LOCATION);
         if (status !== 'granted') {
              alert("Hey! You might want to enable location for the app, you're missing out");
         }
         const location = await Promise.race([
             new Promise((resolver) => {
                 setTimeout(resolver, 3000, null);
             }),
             Location.getCurrentPositionAsync({
                 maximumAge: 1000 * 60 * 5, // 5 Minutes
             }),
         ]);
         if (location === null) {
             alert('the location value is null, no location data was retrived from your phone ')
         }

         var userID = firebase.auth().currentUser.uid;
         // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
         let userRef = database.ref('users/' + userID);
         userRef.update({'locationToken': location});
         // return location;

         // this is the last page so go to the main page

        userRef.update({new_user:"false"});
         this.props.navigation.navigate('Main');


     };


        onDonePress = () => {
            database = firebase.database();
            var userID = firebase.auth().currentUser.uid;
            // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';

            let userRef = database.ref('users/' + userID);

            userRef.update({new_user: "false"});
            this.props.navigation.navigate('Main');
        };


    _renderItem = ({ item, dimensions }) => (



        <LinearGradient
            style={[
                styles.mainContent,
                {
                    flex: 1,
                    paddingTop: 25,
                    paddingBottom: 25,
                    width: dimensions.width,
                },
            ]}
            colors={['#2C5364','#203A43','#0F2027' ]}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
                        >



                            {/*FEMALE BUTTON */}
                            <View style={{top:item.topPage3,justifyContent:item.viewJustifyContent,left:item.viewLeft,zIndex:item.viewIndex,alignItems:item.viewAlignItems,width:item.viewWidth,height:item.viewHeight, textAlign:item.viewTextAlign,backgroundColor:item.viewBackgroundColor}}>
                                <TouchableHighlight style={{position: 'absolute', width:"50%", height:"100%", top:"200%", left:"5%",color:'blue',}}
                                                    onPress={()=> {this.femaleBtn()}}
                                                    underlayColor={"#fdbb2d"}

                                >
                                    <Ionicons
                                        style={{ backgroundColor: 'transparent', borderWidth:2, borderColor:item.pageColor, width:"100%", height:"100%", textAlign: 'center',
                                            justifyContent:'center',
                                            paddingTop:25,
                                        color:"white",
                                        }}
                                        name={item.icon1}
                                        size={80}
                                        color="black"
                                    />

                                </TouchableHighlight>
                            </View>



                            {/*MALE BUTTON */}

                            <View style={{top:item.viewTop,justifyContent:item.viewJustifyContent,left:item.viewLeft2,zIndex:item.viewIndex,alignItems:item.viewAlignItems,width:item.viewWidth,height:item.viewHeight, textAlign:item.viewTextAlign,backgroundColor:item.viewBackgroundColor}}>
                                <TouchableHighlight style={{position: 'absolute', width:"50%", height:"100%", top:item.topMaleBtn, left:"5%",}}
                                                    onPress={()=> {this.maleBtn()}}
                                                    underlayColor={"#FDC830"}

                                >
                                    <Ionicons style={{ backgroundColor: 'transparent', borderWidth:2, borderColor: item.pageColor, width:"100%", height:"100%", textAlign: 'center',
                                        justifyContent:'center',
                                        paddingTop:25,
                                        color:"white",
                                        top:item.topMale,
                                    }}
                                              name={item.icon2}
                                              size={80}
                                              color="black"
                                    />
                                </TouchableHighlight>
                            </View>


                            <View style={styles.animationContainer}>
                                <LottieView style={styles.logo} source={item.animation}  autoPlay loop />
                            </View>

                            {(item.key == "Notification") ? (
                                <View style={styles.animationContainerNotification}>
                                    <LottieView style={styles.logo} source={item.animationNotification}  autoPlay loop />
                                </View>
                            ) : null}

                            {(item.key == "Location") ? (
                                <View style={styles.animationContainerLocation}>
                                    <LottieView style={styles.logo} source={item.animationNotification}  autoPlay loop />
                                </View>
                            ) : null}


                            <View style={{alignItems:item.textAlign, top:item.textTop}}>
                                <Animatable.Text animation="fadeInDown" style={{top:item.top,fontSize:item.fontSize,color:item.color,textAlign:item.textAlign,marginBottom:item.marginBottom,fontFamily:item.fontFamily}}> {item.title}</Animatable.Text>
                                <Text style={{top:item.toptxt, color:'white', backgroundColor: 'transparent', textAlign:'center', paddingHorizontal:16, fontSize: 20, fontFamily: 'Rubik-Regular',}}>{item.text}</Text>
                            </View>


                            {/*PAGE 3 BUTTONS WILL ONLY SHOW IF WE ARE THERE*/}

                            {/*ENGLISH UNIT BUTTON*/}
                            {(item.key == "Units") ? (
                                <TouchableHighlight style={{width:item.widthEnglish,height:item.heightEnglish,top:item.topEnglish,alignItems:'center',justifyContent:'center',backgroundColor:'transparent' ,borderRadius: 30, borderColor:'white', borderWidth:1}}
                                                    onPress={()=> {this.englishUnit()}}
                                                    underlayColor={"#fdbb2d"}
                                >
                                    <Text style={{color:'white',fontFamily:'Rubik-Medium', fontSize:16,}}> English (lbs,in)</Text>
                                </TouchableHighlight>
                            ) : null}

                            {/*METRIC UNIT BUTTON */}
                            {(item.key == "Units") ? (
                                <TouchableHighlight style={{width:item.widthMetric,height:item.heightMetric,top:item.topMetric,alignItems:'center',justifyContent:'center',backgroundColor:'transparent', borderRadius: 30, borderColor:'white', borderWidth:1}}
                                                    onPress={()=> {this.metricUnit()}}
                                                    underlayColor={"#fdbb2d"}
                                >
                                    <Text style={{color:'white',fontFamily:'Rubik-Medium',fontSize:16,}}> Metric (kgs,cm)</Text>

                                </TouchableHighlight>
                            ) : null}


                            {/* NOTIFICATION BUTTON  */}
                            {(item.key == "Notification") ? (

                                <View style={styles.locationBtnContainer}>
                                <TouchableHighlight style={{width:item.widthMetric,height:"30%",top:item.topMetric,alignItems:'center',justifyContent:'center',backgroundColor:'transparent', borderRadius: 30, borderColor:'white', borderWidth:1}}
                                                    onPress={()=> {this.onNotifPress()}}
                                                    underlayColor={'#fdbb2d'}
                                >
                                    <Text style={{color:'white',fontFamily:'Rubik-Medium',fontSize:16,}}> Allow Notifications</Text>

                                </TouchableHighlight>
                                </View>
                            ) : null}

                            {/*LOCATION BUTTON */}
                            {(item.key == "Location") ? (

                                <View style={styles.notifBtnContainer}>
                                    <TouchableHighlight style={{width:item.widthMetric,height:"30%",top:item.topMetric,alignItems:'center',justifyContent:'center',backgroundColor:'transparent', borderRadius: 30, borderColor:'white', borderWidth:1}}
                                                        onPress={()=> {this.onLocationPress()}}
                                                        underlayColor={"#fdbb2d"}
                                    >
                                        <Text style={{color:'white',fontFamily:'Rubik-Medium',fontSize:16,}}> Allow Location</Text>

                                    </TouchableHighlight>
                                </View>
                            ) : null}








                            {/*SCROLL VIEW FOR HEIGHT */}


                            {(item.key == "Height") ? (

                                <Animated.ScrollView
                                    ref={this.scrollViewRefHeight}
                                    horizontal
                                    contentContainerStyle={styles.scrollViewContainerStyleHeight}
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    snapToInterval={snapSegment}
                                    onScroll={Animated.event([{
                                            nativeEvent:{
                                                contentOffset:{x: this.state.scrollXHeight}
                                            }
                                        }
                                        ],
                                        {useNativeDriver: true}
                                    )}
                                >
                                    <RulerHeight/>
                                </Animated.ScrollView>
                            ) : null}

                            {(item.key == "Height") ? (

                                <TextInput ref={this.textInputRefHeight}
                                           style={styles.weightTextStyle}
                                           defaultValue={minWeight.toString()}
                                           editable={false}

                                >
                                </TextInput>
                            ) : null}

                            {(item.key == "Height") ? (
                                <View style={[styles.segment, styles.segmentIndicatorHeigth, ]}/>
                            ) : null}


                            {/*SCROLL VIEW FOR WEIGHT */}


                            {(item.key == "Weight") ? (

                                <Animated.ScrollView
                                    ref={this.scrollViewRefWeight}
                                    horizontal
                                    contentContainerStyle={styles.scrollViewContainerStyleWeight}
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    snapToInterval={snapSegment}
                                    onScroll={Animated.event([{
                                            nativeEvent:{
                                                contentOffset:{x: this.state.scrollXWeight}
                                            }
                                        }
                                        ],
                                        {useNativeDriver: true},

                                    )

                                    }
                                >
                                    <RulerWeight />
                                </Animated.ScrollView>
                            ) : null}

                            {(item.key == "Weight") ? (
                                <TextInput ref={this.textInputRefWeigth}
                                           style={styles.weightTextStyle}
                                           defaultValue={minWeight.toString()}
                                           editable={false}
                                            >
                                </TextInput>
                            ) : null}



                            {(item.key == "Weight") ? (
                                <View style={[styles.segment, styles.segmentIndicatorWeigth, ]}/>

                            ) : null}




                        </LinearGradient>
    );



    render() {
        return (


            <AppIntroSlider
                slides={slides}
                renderItem={this._renderItem}
                // bottomButton
                showPrevButton
                onDone={this.onDonePress}



                // showSkipButton
                // hideNextButton
                // hideDoneButton
                // // onSkip={() => console.log("skipped")}


            />

        );
    }
}

const slides = [
    {
        index:1,
        key: 'Welcome',
        title: 'Welcome',
        text:"Let's get you you set up!",
        icon: "",
        colors: ['#63E2FF', '#B066FE'],
        animation:require('../animations/first'),
        top:"-90%",
        fontSize: 45,
        color: "white",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily:'Rubik-Light',
        textTop:"-20%",
        hide: "true",
        toptxt:"-65%",
        topfemale:"-50%",
        pageColor:'transparent',

    },
    {
        index:2,
        key: 'Gender',
        title: 'Female or Male?',
        text:
            'Male or Female?',
        icon1: 'ios-woman',
        icon2:'ios-man',
        colors: ['#A3A1FF', '#3A3897'],
        animation:"",
        top:"-430%",
        fontSize: 35,
        color: "white",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily:'Rubik-Light',
        viewIndex:1,
        viewAlignItems:'center',
        viewJustifyContent:'center',
        viewFlexDirection:'row',
        viewWidth:"80%",
        viewHeight:"18%",
        textTop:"-22%",
        viewLeft:"-5%",
        viewLeft2:"40%",
        viewTop:"-18%",
        viewTextAlign:'center',
        toptxt:"-420%",
        pageColor:'white',
        topMale:"0%",
        topMaleBtn:"200%",




    },
    {
        index:3,
        key: 'Units',
        title: 'Units of measurement',
        text: 'which system of units would you like to use?',
        colors: ['#29ABE2', '#4F00BC'],
        animation:"",
        top:"-200%",
        fontSize: 35,
        color: "white",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily:'Rubik-Light',
        toptxt:"-200%",
        topMale:"-160%",
        topMaleBtn:"-50%",
        pageColor:'transparent',
        widthEnglish:"100%",
        heightEnglish:"7%",
        topEnglish:"-10%",
        widthMetric:"100%",
        heightMetric:"7%",
        topMetric:"-8%",
        textTop:"10%",

    },
    {
        index:4,
        key: 'Weight',
        title: 'How much do you weigh?',
        text:"This is used to set up recommendations just for you!",
        icon: "",
        colors: ['#63E2FF', '#B066FE'],
        top:"-50%",
        fontSize: 35,
        color: "white",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily:'Rubik-Light',
        textTop:"-20%",
        hide: "true",
        toptxt:"-45 %",
        topfemale:"-50%",
        pageColor:'transparent',

    },
    {
        index:5,
        key: 'Height',
        title: 'Whats your height?',
        text:"This is used to set up recommendations just for you!",
        icon: "",
        colors: ['#63E2FF', '#B066FE'],
        top:"-50%",
        fontSize: 35,
        color: "white",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily:'Rubik-Light',
        textTop:"-20%",
        hide: "true",
        toptxt:"-45 %",
        topfemale:"-50%",
        pageColor:'transparent',

    },
    {
        index:6,
        key: 'Notification',
        title: 'Allow Notifications',
        text:"Allow Notifications to get the most out of the app!",
        icon: "",
        animationNotification:require('../animations/notification'),
        colors: ['#63E2FF', '#B066FE'],
        top:"-50%",
        fontSize: 35,
        color: "white",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily:'Rubik-Light',
        textTop:"-65%",
        hide: "true",
        toptxt:"-45%",
        topfemale:"-50%",
        pageColor:'transparent',

    },
    {
        index:7,
        key: 'Location',
        title: 'Allow Location',
        text:"Allow Location to get the most out of the app and to enable the run route feature!",
        icon: "",
        animationNotification:require('../animations/location'),
        colors: ['#63E2FF', '#B066FE'],
        top:"-50%",
        fontSize: 35,
        color: "white",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily:'Rubik-Light',
        textTop:"-65%",
        hide: "true",
        toptxt:"-45%",
        topfemale:"-50%",
        pageColor:'transparent',

    },

];