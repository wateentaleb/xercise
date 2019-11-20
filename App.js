
import React from 'react'
import AppNavigator from "./Screens/AppNavigator";
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import * as Font from "expo-font";




export default class App extends React.Component{
    state = {
        fontLoaded:false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Rubik-Light': require('./Fonts/Rubik-Light.ttf'),
            'Rubik-Medium': require('./Fonts/Rubik-Medium.ttf'),
            'Questrial': require('./Fonts/Questrial-Regular.ttf'),
            'Rubik-Bold':require('./Fonts/Rubik-Bold.ttf'),
            'Rubik-Regular':require('./Fonts/Rubik-Regular.ttf'),
        });

        this.setState({ fontLoaded: true });
    }

    render(){
            return(
                <View style={{flex:1}}>
                {
                    this.state.fontLoaded ? (
                       <AppNavigator/>
                    ) : null
                }
                </View>

    )

    }
}