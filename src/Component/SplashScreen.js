import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { storeUid } from '../Redux/UidStore/UidAction'
import { fetchUserData } from '../Firebase/AuthServices';


class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getUserData = (uid, callback) => {
        fetchUserData(uid, async (snap) => {
            callback(snap)
        })

    }

    componentDidMount = async () => {

        setTimeout(
            async () => {
                let auth = await AsyncStorage.getItem('isAuth')
                if (!auth) {
                    this.props.navigation.navigate('Auth')
                }
                else {
                    const uid = await AsyncStorage.getItem('uid')
                    this.props.storeUid(uid)
                    this.getUserData(uid, (snap) => {
                        this.props.navigation.navigate('Notes',
                            {
                                'page': 'Notes',
                                'userObj': snap
                            }
                        )
                    })
                }
            }, 1000
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



function mapDispatchToProps(dispatch) {
    return {
        storeUid: (uid) => dispatch(storeUid(uid))
    };
}


export default connect(null, mapDispatchToProps)(SplashScreen)
