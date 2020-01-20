import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { styles } from '../../Css/LoginCss'
import { OutlinedTextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements';
import { loginUser } from '../../Firebase/FirebaseLoginServices';
import Icon from 'react-native-vector-icons/Ionicons'

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            visibleIcon: false,
            animating: false,
            errors: {}
        };
    }

    validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (typeof this.state.email !== "undefined") {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                formIsValid = false;
                errors["email"] = "*Enter valid email-ID.";
            }
        }

        if (!this.state.email) {
            errors["email"] = "*Enter email id";
            formIsValid = false;
        }

        if (!this.state.password) {
            errors["password"] = "*Enter password";
            formIsValid = false;
        }

        this.setState({
            errors: errors
        })

        return formIsValid
    }

    submitUserSignIn = () => {
        if (this.validateForm()) {
            loginUser(this.state.email, this.state.password, () => {
                this.setState({ animating: true })
                alert('You have login successfully')
                //this.props.navigation.navigate('HomeScreen')
            }, (errors) => {
                this.setState({
                    errors: errors
                })
            })
        }
    }

    render() {

        return (
            <View style={styles.mainContainer}>

                <ProgressBarAndroid
                    animating={this.state.animating}
                    styleAttr="Horizontal"
                    color="#2196F3"
                />

                <Text style={styles.appTitle}>
                    <Text style={{ color: '#4285F4' }}>F</Text>
                    <Text style={{ color: '#DB4437' }}>u</Text>
                    <Text style={{ color: '#F4B400' }}>n</Text>
                    <Text style={{ color: '#4285F4' }}>d</Text>
                    <Text style={{ color: '#0F9D58' }}>o</Text>
                    <Text style={{ color: '#DB4437' }}>o</Text>
                </Text>

                <Text style={styles.createTitle}>
                    Sign in
                </Text>

                <Text
                    style={{
                        flex: 0,
                        textAlign: 'center',
                        fontSize: 17,
                        top: '6%'
                    }}>
                    with your Fundoo Account
                </Text>

                <View style={styles.inputContainer}>

                    <View style={styles.inputView}>
                        <OutlinedTextField
                            testID="testEmail1"
                            label="Email"
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            error={this.state.errors.email}
                            errorColor='red'
                        />
                    </View>

                    <View style={styles.passIconViewInSignIn}>

                        <View style={styles.passView2}>
                            <OutlinedTextField
                                testID="testPassword1"
                                label="Password"
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={!this.state.visibleIcon}
                                error={this.state.errors.password}
                                errorColor='red'
                            />
                        </View>

                        <View style={{ padding: '3%' }}>
                            <TouchableOpacity
                                testID="testPassIcon1"
                                onPress={() => this.setState({ visibleIcon: !this.state.visibleIcon })}
                            >
                                {
                                    !this.state.visibleIcon ?
                                        <Icon name="md-eye" size={40} /> :
                                        <Icon name="md-eye-off" size={40} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flex: 1, alignSelf: 'flex-start'
                    }}>
                        <Button
                            testID="testForgotPassword"
                            title="forgot password?"
                            type="clear"
                            onPress={() => this.props.navigation.navigate('ForgotPassword')}
                        />
                    </View>

                </View>

                <View
                    style={{
                        flex: 1.5,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }
                    }
                >
                    <Button
                        testID="testCreateAccount"
                        title="Create Account"
                        onPress={() => this.props.navigation.navigate('SignUpPage1')}
                        type="clear"
                    />
                    <View style={{ width: 120 }}>
                        <Button
                            testID="testSignInButton"
                            title="Next"
                            onPress={this.submitUserSignIn}
                        />
                    </View>

                </View>

            </View>
        );
    }
}