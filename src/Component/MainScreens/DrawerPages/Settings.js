import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield'
import { Button } from 'react-native-paper';
import OtherTopbar from '../Dashboard/OtherTopbar';
import * as Keychain from 'react-native-keychain';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.page = props.navigation.getParam('page'),
            this.state = {
                user: '',
                pass: ''
            };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <OtherTopbar page={this.page} {...this.props} />

                <View style={{ height: '71%', marginHorizontal: 25, }}>
                    <TextField
                        label={'Username'}
                        value={this.state.user}
                        onChangeText={user => this.setState({ user })}
                        ref={refs => this.userRef = refs}
                    />
                    <TextField
                        label={'Password'}
                        value={this.state.pass}
                        onChangeText={pass => this.setState({ pass })}
                        ref={refs => this.passRef = refs}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 30 }}>
                        <Button color={'dodgerblue'} mode='outlined' style={{
                            width: 100
                        }}
                            onPress={() => {
                                this.userRef.clear()
                                this.passRef.clear()
                            }}
                        >Clear</Button>
                        <Button color={'dodgerblue'} mode='outlined' style={{
                            width: 100
                        }}
                            onPress={async () => {
                                await Keychain.setGenericPassword(this.state.user, this.state.pass);
                                alert('Your username and Password has set')
                            }}
                        >Save</Button>
                    </View>

                </View>

            </View >
        );
    }
}
