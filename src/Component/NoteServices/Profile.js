import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Dialog, Avatar, Button } from 'material-bread';
import { signOut } from '../../Firebase/AuthServices';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    randomColor = () => {
        let colorArray = [
            '#4f2da6', '#cc405c', '#cf6017', '#d1d119', '#54d421',
            '#4d41d4', '#1acfd9', '#25465e', '#625f63', '#2f8f7c',
            '#027b99', '#eb4949', '#bd8b02', '#32a88f', '#655dcf'
        ];
        let random = Math.floor(Math.random() * colorArray.length);
        return colorArray[random];
    }

    render() {
        return (
            <>
                <Avatar
                    type="text"
                    content="A"
                    contentColor={'white'}
                    size={35}
                    color={'#eb4949'}
                    onPress={() => this.setState({ visible: !this.state.visible })}
                />
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => this.setState({ visible: false })}
                    style={
                        {
                            width: 400,
                            height: 200
                        }
                    }
                >
                    <Avatar
                        type="text"
                        content="A"
                        contentColor={'white'}
                        size={80}
                        color={'#eb4949'}
                        style={
                            {
                                alignSelf: 'center',
                            }
                        }
                    />
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            top: 50
                        }}
                    >
                        <Button
                            text={'cancel'}
                            onPress={() => this.setState({ visible: false })}
                        />
                        <Button
                            text={'Sign out'}
                            onPress={() => {
                                signOut(async() => {
                                     console.log( await AsyncStorage.getItem('isAuth'))
                                    await AsyncStorage.clear()
                                    this.props.navigation.navigate('SignIn')
                                })
                            }}
                        />
                    </View>
                </Dialog>
            </>
        );
    }
}
