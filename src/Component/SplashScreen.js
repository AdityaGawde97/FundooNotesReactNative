import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        setTimeout(
            async()=>{
                let auth = await AsyncStorage.getItem('isAuth')
                if(!auth){
                    this.props.navigation.navigate('Auth')
                }
                else{
                    this.props.navigation.navigate('Notes')
                }
            },1000
        )
    }

    render() {
        return (
            <View
                style={
                    {
                        flex: 1,
                        backgroundColor: '#F4B400',
                        justifyContent: 'center',
                        alignItems: 'center'

                    }
                }
            >
                <Icon
                    name={'google-keep'}
                    size={200}
                    color={'#fff'}
                />
                <Text
                    style={
                        {
                            fontSize: 40,
                            color: '#fff',
                            fontFamily: 'monospace'
                        }
                    }
                >
                    Fundoo Notes
                </Text>
            </View>
        );
    }
}
