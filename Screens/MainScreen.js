
import React from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    TouchableHighlight,
} from 'react-native'
import * as firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import GraphComponentAx from "./GraphComponentAx";
import test from './test'



// const name = navigation.getParam('name', 'no-name');
// const name = this.props.navigation.getParam('name', 'no-name');
export default class MainScreen extends React.Component {
    // uncomment head:null if you dont want a header

    static navigationOptions = {

        // title: 'HealthU'
        header: null

    };



    constructor(props) {


        // this.gotData = this.gotData.bind(this);
        super(props);

        this.calibrationTest = this.calibrationTest.bind(this);
        // this._checkUserType = this._checkUserType.bind(this);
        this.state = {
            newUser: 'false',
            animation: null,
            picture: "",
            name: "",
            day: "",
            month:"",
            year:"",
            distanceRan:0,
            weight:0,
            workoutsCompleted:0,
            previousWorkout:"",
            numExercise:0,

            // progress: new Animated.Value(0),
            // progress: new Animated.Value(0),
            // userInfo: this.props.navigate.state.params.userInfo,
        }
        this.workoutScreen = this.workoutScreen.bind(this);
        // this.gotData = this.gotData.bind(this)
    }




    workoutScreen(){
        this.props.navigation.navigate('workout');
    }

    calibrationTest(){
        this.props.navigation.navigate('test');
    }



    componentDidMount() {
        // first lets check if the user is a new one or not by calling our function
        // it will return workoutType, we will evaluate that variable and work accordingly
        //  this._checkUserType();
        database = firebase.database();




        // change the below code we are just hard coding the user id so we dont have to login
        // every single time we are changing the data

        // var userID = firebase.auth().currentUser.uid;
        var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        // var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        var ref = database.ref('users/' + userID + '/workoutType');

        // finding out if the user is new
        // var val = ref.on("value", snapshot => {
        //     if (snapshot.val() == 'empty') {
        //         this.props.navigation.navigate('NewUser')
        //     }
        // })

        // uploading the profile picture of the user
        var ref = database.ref('users/' + userID + '/pictureUrl/data/url');
        const val1 = ref.on("value", snapshot => {
            this.setState({ picture: snapshot.val() })
        })

        // Getting the name of the user

        var ref = database.ref('users/' + userID + '/name');
        const name = ref.on("value", snapshot => {
            this.setState({ name: snapshot.val() })
        })

        // Setting up the date

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        // if the date is a number value we need to change it to its appropriate month name
        if(!(isNaN(month))){
            if (month == 1)
                var month = "Jan";
            else if (month == "2")
                var month = "Feb";
            else if(month == 3)
                var month = "Mar";
            else if(month == 4)
                var month = "Apr";
            else if(month == 5)
                var month = "May";
            else if(month == 6)
                var month = "Jun";
            else if(month == 7)
                var month = "Jul";
            else if(month == 8)
                var month = "Aug";
            else if(month == 9)
                var month = "Sep";
            else if(month == 10)
                var month = "Oct";
            else if(month == "11")
                var month = "Nov";
            else if(month == "12")
                var month = "Dec"


        }

        this.setState({
            //Setting the value of the date time
            // date:
            //     date + '/' + month + '/' + year,
            day: date,
            month: month,
            year: year,

        });

        // getting the number of workouts completed
        var ref = database.ref('users/' + userID + '/workoutsCompleted');
        const val3 = ref.on("value", snapshot => {
            this.setState({ workoutsCompleted: snapshot.val() })
        });

        // getting distance ran completed
        var ref = database.ref('users/' + userID + '/distanceCompleted');
        const val4 = ref.on("value", snapshot => {
            this.setState({ distanceCompleted: snapshot.val() })
        });

        // getting the user weight
        var ref = database.ref('users/' + userID + '/weight');
        const weight = ref.on("value", snapshot => {
            this.setState({ weight: snapshot.val() })
        });



        // getting the number of workouts completed
        var ref = database.ref('users/' + userID + '/workoutsCompleted');
        const workoutsCompleted = ref.on("value", snapshot => {
            this.setState({ workoutsCompleted: snapshot.val() })
        });


        var ref = database.ref('users/' + userID + '/previousWorkout');
        const previousWorkout = ref.on("value", snapshot => {
            this.setState({ previousWorkout: snapshot.val() })
        });

        var ref = database.ref('users/' + userID + '/numExercise');
        const numExercise = ref.on("value", snapshot => {
            this.setState({ numExercise: snapshot.val() })
        });




    }


    // if first time using app, then ask for current weight, goal weight, activity level
    // trying to gain weight or lose weight?
    // are you taking any medication? yes or no



    render() {
        return (
            <LinearGradient colors={['#EAEAF3', '#EAEAF3']} style={styles.container}>
                <Text style={styles.title}> Dashboard </Text>
                <Image style={styles.img} source={{ uri: this.state.picture }} />
                <View style={styles.workoutbox}>
                    <View style={{marginTop:"5%"}}/>
                    <Text style={styles.numtxt}> {this.state.workoutsCompleted} </Text>
                    <View style={{marginTop:"5%"}}/>
                    <Text style={styles.worktxt}> workouts </Text>
                </View>
                <View style={styles.runbox}>
                    <View style={{marginTop:"5%"}}/>
                    <Text style={styles.numtxt}> {(this.state.distanceCompleted) + ((this.state.unit === 'english')? " mile":" km")} </Text>
                    <Text style={styles.destxt}> distance ran </Text>
                </View>
                <View style={styles.weightbox}>
                    <View style={{marginTop:"5%"}}/>
                    <View style={{marginRight:"20%"}}/>
                    <Text style={styles.numtxt}> {(this.state.weight)}</Text>
                    <Text style={styles.weighttxt}> current weight </Text>
                </View>


                {/*we only show this section if there has been a previous workout*/}

                {(this.state.workoutsCompleted !==0) ? (
                    <View style={styles.lastwrk}>


                        <View style={styles.datebox}>
                            <Text style={styles.daytxt}> {this.state.day}</Text>
                            <Text style={styles.monthtxt}> {this.state.month} </Text>
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.descriptiontxt}> Previous Workout </Text>
                            <Text style={styles.descriptionworkout}> {(this.state.previousWorkout)} </Text>
                            <Text style={styles.descriptionnum}> {(this.state.numExercise)+" Exercises Completed"} </Text>
                        </View>

                        <AntDesign onPress={this.workoutScreen} style={styles.arrow} name="right" size={20} color="#a6a6a6" />

                    </View>



                ) :
                    <View style={styles.no_workout}>

                        <Image style={styles.emptyGraph} source={require('../assets/no-workout.png')} />
                        <View style={{marginTop:20}}/>
                        <Text style={styles.no_workout_text}> You have no workouts yet. Go on and create your{"\n"} {"\n"} first one so to calibrate the device!</Text>
                        <LinearGradient
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={['#5158E7',  '#28294A']}
                            style={styles.createbtn}>
                            <TouchableOpacity onPress={this.calibrationTest}>
                                {/*<Text style={styles.registerTxt}> Sign Up</Text>*/}
                                <Text style={{color:'#ffffff',fontSize:17}}> Create Workout </Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    // this is the other case if, we havent done any workouts we need to show another view

                }


                {(this.state.workoutsCompleted !==0) ? (
                        <View style={styles.bottomsection}>

                            <Text style={{ fontFamily: 'Rubik-Regular', color: 'grey', fontSize: 14, top: "0%", left: "-35%" }}> My Workouts</Text>

                            <TouchableOpacity style={styles.showbtn}><Text style={styles.showtxt}> Show All </Text></TouchableOpacity>

                            {/*<Image style={{ top: "0%", width: 370, height: 300 }} source={require('../assets/graph.png')} />*/}
                            <GraphComponentAx/>
                        </View>

                    ) : null

                    // this is the other case if, we havent done any workouts we need to show another view
                }



            </LinearGradient>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        //justifyContent: 'center',
        alignItems: 'center',

        // #4b0123
    },
    title: {
        top: "10%",
        right: "25%",
        fontFamily: 'Rubik-Bold',
        fontSize: 27,
    },
    workoutbox: {
        top: "5.05%",
        right: "35%",
        width: 132,
        height: 100,
        borderWidth: 0.8,
        borderColor: '#cccccc',
        alignItems: 'center',
    },
    runbox: {
        top: "-7.25%",
        width: 132,
        height: 100,
        borderWidth: 0.8,
        borderColor: '#cccccc',
        alignItems: 'center',

    },
    weightbox: {
        top: "-19.6%",
        right: "-35%",
        width: 132,
        height: 100,
        borderColor: '#cccccc',
        borderWidth: 0.8,
        alignItems: 'center',

    },

    img: {
        top: "4%",
        right: "-35%",
        width: 50,
        height: 50,
        borderRadius: 5
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
    destxt: {
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        marginTop: 13,
    },
    weighttxt: {
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        marginTop: 12,
    },
    lastwrk: {
        top: "-19.7%",
        width: "100%",
        height: 125,
        borderWidth: 0.8,
        borderColor: '#cccccc',
        alignItems: 'center',
        padding: 25,
    },
    datebox: {
        backgroundColor: "#4B69E5",
        height: 80,
        width: 60,
        left: "-41%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 2,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    daytxt: {
        fontFamily: 'Rubik-Bold',
        color: 'white',
        fontSize: 17,
    },

    monthtxt: {
        fontFamily: 'Rubik-Bold',
        color: 'white',
        fontSize: 12
    },
    description: {
        top: "-100%"
    },

    descriptiontxt: {
        fontFamily: 'Rubik-Regular',
        color: 'grey',
        fontSize: 14,

    },
    descriptionworkout: {
        marginTop: 5,
        fontFamily: 'Rubik-Bold',
        fontSize: 21,
    },

    descriptionnum: {
        marginTop: 2,
        fontFamily: 'Rubik-Bold',
        fontSize: 13,
    },
    arrow: {
        top: "-150%",
        right: "-45%",
        color:"#4B69E5",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    bottomsection: {
        top: "-24%",
        width: "100%",
        height: "50%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    showtxt: {
        fontFamily: 'Rubik-Bold',
        fontSize: 13,
        color: '#4B69E5'
    },
    showbtn: {
        top: "-3%",
        left: "35%"
    },
    no_workout:{
        top:"-16%",

    },
    emptyGraph:{
        width:350,
        height:"55%",

    },
    no_workout_text:{
        fontFamily: 'Rubik-Regular',
        fontSize: 14,
        color:'#646467',
        textAlign: 'center'
    },
    createbtn:{

        alignItems:'center',
        justifyContent:'center',
        top: "3%",
        borderWidth:1,
        width:350,
        height:"10%",
        borderRadius: 25,
        borderColor:'transparent',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },



});
