import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../Css/LoginCss'
import { OutlinedTextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements';
import { emailExistance } from '../../Firebase/FirebaseLoginServices';

export default class SignUpPage2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            errors: {}
        }

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

        this.setState({
            errors: errors
        })

        return formIsValid
    }

    goToSignUpPage3 = () => {
        if (this.validateForm()) {
            const { navigation } = this.props;
            let firstName = navigation.getParam('firstName');
            let lastName = navigation.getParam('lastName');

            emailExistance(this.state.email,
                () => {
                    this.props.navigation.navigate('SignUpPage3', {
                        firstName: firstName,
                        lastName: lastName,
                        email: this.state.email
                    })
                },
                (errors) => {
                    this.setState({
                        errors: errors
                    })
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
                    Choose your Fundoo address
                </Text>

                <Text style={styles.subTitle}>
                    Create your own
                </Text>

                <View style={styles.inputContainer}>

                    <View style={styles.inputView}>
                        <OutlinedTextField
                            testID="testEmail2"
                            label="Email"
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            error={this.state.errors.email}
                            errorColor='red'
                        />
                    </View>

                </View>

                <View style={styles.nextInSignUp}>
                    <Button
                        testID="testNextButton2"
                        title="Next"
                        onPress={this.goToSignUpPage3}
                    />
                </View>

            </View>
        );
    }
}