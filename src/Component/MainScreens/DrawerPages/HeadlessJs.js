import React, { Component } from 'react';
import { View, Text, AppRegistry } from 'react-native';

const LogLocation = async (data) => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
    });
}
AppRegistry.registerHeadlessTask('LogLocation', () => LogLocation);
