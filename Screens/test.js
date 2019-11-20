import React, { Component } from 'react';
import { Text, View } from 'react-native';
import GraphComponentAx from "./GraphComponentAx";
import GraphComponentAy from "./GraphComponentAy";
import GraphComponentAz from "./GraphComponentAz";

export default class test extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <GraphComponentAx/>
            <GraphComponentAy/>
            <GraphComponentAz/>
            </View>
        );
    }
}
