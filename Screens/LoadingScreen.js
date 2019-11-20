import React from 'react';
import {StyleSheet, View, Text, } from 'react-native';


export default class LoadingScreen extends React.Component{
    render() {
        return(
            <View style={styles.container}>
                <Text> Authentication Screen</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    }
});