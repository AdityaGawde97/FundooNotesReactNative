import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Button } from 'react-native-paper';

export default class LockScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: [],
        };
    }

    lockTheScreen = async () => {

        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                console.log('Credentials successfully loaded for user ' + credentials.username);
            } else {
                console.log('No credentials stored')
            }
        } catch (error) {
            console.log('Keychain couldn\'t be accessed!', error);
        }
        await Keychain.resetGenericPassword()
    }

    componentDidMount = () => {
        this.lockTheScreen()
    };


    render() {
        console.log(this.state.pass)
        const { pass } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgray', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{ fontSize: 30, color: 'royalblue', marginVertical: 5 }}
                    >Lock screen</Text>
                    <Text
                        style={{ fontSize: 18, color: 'teal', marginVertical: 5 }}
                    >Enter your password</Text>

                    <View
                        style={{
                            backgroundColor: 'lightblue',
                            width: '90%', height: 50,
                            marginVertical: 35,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        {pass.length !== 0 &&
                            (pass).map((num) => (
                                <Text
                                    style={{ fontSize: 30 }}
                                >*</Text>
                            ))
                        }

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).map((num) => (
                            <Button
                                style={{ backgroundColor: 'white', width: '30%', margin: '1%', height: '20%' }}
                                mode={'outlined'}
                                color='dodgerblue'
                                onPress={() => {
                                    this.setState({
                                        pass: [...pass, num]
                                    })
                                }}
                            >{num}</Button>
                        ))}
                    </View>
                    <Button
                        color='white'
                        style={{ backgroundColor: 'dodgerblue', width: '90%', marginTop: 30 }}
                        onPress={async () => {
                            //const credentials = await Keychain.getGenericPassword()
                            let passString = '';
                            for (i = pass.length - 1; i >= 0; i--) {
                                passString = pass[i] + passString
                            }
                            console.log(passString)
                        }}
                    >Next</Button>
                </View>

            </View>
        );
    }
}
