import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { LineChart, Grid, XAxis, YAxis,Path } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from "firebase";
import {createPixelDataAsync} from "expo/build/takeSnapshotAsync/Creator.web";


class GraphComponentAx extends React.PureComponent {



    constructor(props) {


        // this.gotData = this.gotData.bind(this);
        super(props);
        // this._checkUserType = this._checkUserType.bind(this);
        this.state = {
            Ax: 0,
            Ay: 0,
            Az: 0,
            dataArray:[],
            count: 0,
            reference:0,
            difference:0,




            // progress: new Animated.Value(0),
            // progress: new Animated.Value(0),
            // userInfo: this.props.navigate.state.params.userInfo,
        };



        // this.gotData = this.gotData.bind(this)
    }

    componentDidMount() {
        database = firebase.database();



        var joined = 0;
        var difference = 0;

        // change the below code we are just hard coding the user id so we dont have to login
        // every single time we are changing the data
        var userID = 'BGt6dvYPllX1D8qxiiWEPqV8hpi1';
        // var userID = firebase.auth().currentUser.uid;

        var ref = database.ref('users/' + userID + '/Ay');
        const val1 = ref.on("value", snapshot => {

            // this.setState({ Ax: snapshot.val() })
            // this.state.dataArray.push(snapshot.val());

            // if(this.state.dataArray.length!== 0) {
            //      reference = this.state.dataArray[0];
            //      joined = this.state.dataArray.concat(snapshot.val());
            //    //  difference = reference - joined;
            // }




            var value = snapshot.val();
            // console.log('value: ' + value);

            // console.log('array length is: ' + this.state.count);
            if(this.state.count === 0){
                this.setState({reference: value});
                // console.log('value is : ' + this.state.reference);
            }

            this.setState({count: this.state.count + 1});

            // console.log('this count is '  + this.state.count);
            // console.log('the reference value is ' + this.state.reference);


            this.setState({difference: value - this.state.reference});

            // console.log('difference is: ' + this.state.difference);
            if(this.state.difference < 156 || this.state.difference < -72){
                // console.log('difference is: ' + this.state.difference);
                this.setState({difference: 0});
                // console.log('the chip is stationary');
            }
            // if the user is actually moving the device, then well store in the data points

            // console.log('the difference after cleaning is: '+  this.state.difference);
            if (this.state.difference !== 0) {
                // console.log('the device is moving ');
                var joined = this.state.dataArray.concat(this.state.difference);
                this.setState({dataArray: joined});
                this.setState({count: this.state.count + 1});
            }


            // console.log('difference is '  +this.state.difference);
            // console.log('value: ' + value);
            // console.log('reference: ' + this.state.reference);
            // this.setState({difference: value - this.state.reference});
            // console.log('difference is '  +this.state.difference);




        });


    }

    render() {
        // const data = [ this.state.Ax, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];

        console.log('the y motion array is: ' + this.state.dataArray);

        const data = this.state.dataArray;
        // const data =[1,3,4,6];
        const axesSvg = { fontSize: 10, fill: 'white' };
        const gridSvg = {fontSize:2, fill:'white'};


        const verticalContentInset = { top: 10, bottom: 10 };
        const xAxisHeight = 30;
        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(255, 75, 43, 0.4)'}
            />
        );



        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ 'rgb(255, 75, 43)' }
                    fill={ 'white' }
                />
            ))
        };

        return (
            // need to make a gradient

            //23253A
            //5063EE
            <LinearGradient
                // height 250 padding 20 flexdir row
                style={styles.container}
                start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                colors={[ '#5063EE' ,'#3A4495','#3A4495','#23253A']}

            >
                <YAxis
                    data={data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(255, 75, 43)' }}
                    >
                        <Grid
                            svg={{stroke: 'rgba(255, 255, 255,0.2)'}}
                        />
                        <Shadow/>
                        <Decorator/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </LinearGradient>
        )
    }
}

export default GraphComponentAx;

const styles = StyleSheet.create({
    container: {
        height: 250,
        padding: 20,
        flexDirection: 'row',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    graph:{
        height:300,
        color:'#D10000'
    }
});

{/*<LineChart*/}
{/*    style={{ height: 200 }}*/}
{/*    data={data}*/}
{/*    svg={{ stroke: 'rgb(134, 65, 244)' }}*/}
{/*    contentInset={{ top: 20, bottom: 20 }}*/}
{/*>*/}
{/*    <Grid />*/}
{/*</LineChart>*/}


// add time stamp

//