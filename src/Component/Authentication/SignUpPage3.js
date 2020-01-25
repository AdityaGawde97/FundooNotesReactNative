import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../Css/Authentication.style'
import { OutlinedTextField } from 'react-native-material-textfield'
import { Button, CheckBox } from 'react-native-elements';
import { registerUser } from "../../Firebase/AuthServices";

export default class SignUpPage2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirm: '',
            visibleIcon: false,
            errors: {}
        };
    }

    validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (typeof this.state.password !== "undefined") {
            if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Enter secure and strong password.";
            }
        }

        if (!this.state.password) {
            errors["password"] = "*Enter password";
            formIsValid = false;
        }

        if (typeof this.state.confirm !== "undefined") {
            if (this.state.confirm !== this.state.password) {
                formIsValid = false;
                errors["confirm"] = "*Password does not match.";
            }
        }

        if (!this.state.confirm) {
            errors["confirm"] = "*Enter password";
            formIsValid = false;
        }


        this.setState({
            errors: errors
        })

        return formIsValid
    }

    submitUserSignUp = () => {
        if (this.validateForm()) {
            const { navigation } = this.props
            registerUser(navigation.getParam('firstName'),
                navigation.getParam('lastName'),
                navigation.getParam('email'),
                this.state.password,
                () => {
                    this.props.navigation.navigate('SignIn')
                }
            )
        }
    }

    render() {

        return (
            <View style={styles.mainContainer}>

                <Text style={styles.appTitle}>
                    <Text style={{ color: '#4285F4' }}>F</Text>
                    <Text style={{ color: '#DB4437' }}>u</Text>
                    <Text style={{ color: '#F4B400' }}>n</Text>
                    <Text style={{ color: '#4285F4' }}>d</Text>
                    <Text style={{ color: '#0F9D58' }}>o</Text>
                    <Text style={{ color: '#DB4437' }}>o</Text>
                </Text>

                <Text style={styles.createTitle}>
                    Create a strong password
                </Text>

                <Text
                    style={{
                        flex: 0,
                        textAlign: 'center',
                        fontSize: 15,
                        marginLeft: '8%',
                        marginRight: '8%',
                        top: '7%'
                    }}>
                    Create a strong password with a mix of letters, numbers and symbols
                </Text>



                <View style={styles.inputContainer}>

                    <View style={{ top: 10 }}>
                        <OutlinedTextField
                            testID="testPassword2"
                            label="Password"
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            secureTextEntry={!this.state.visibleIcon}
                            error={this.state.errors.password}
                            errorColor='red'
                        />
                    </View>

                    <View style={{top: 20}}>
                        <OutlinedTextField
                            testID="testConfirmPassword"
                            label="Confirm"
                            value={this.state.confirm}
                            onChangeText={(confirm) => this.setState({ confirm })}
                            secureTextEntry={!this.state.visibleIcon}
                            error={this.state.errors.confirm}
                            errorColor='red'
                        />
                    </View>
                    <View style={{top: 10}}>
                        <CheckBox
                            testID="testPassVisibility2"
                            title="Show password"
                            checked={this.state.visibleIcon}
                            onPress={() => this.setState({ visibleIcon: !this.state.visibleIcon })}
                            containerStyle={{
                                backgroundColor: '#fff',
                                borderColor: '#fff',
                                right: 7
                            }}
                        />
                    </View>

                </View>

                <View style={styles.nextInSignUp}>
                    <Button
                        testID="testNextButton3"
                        title="Next"
                        onPress={this.submitUserSignUp}
                    />
                </View>

            </View>
        );
    }
}