import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../Css/Authentication.style'
import { OutlinedTextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements';

export default class SignUpPage1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            errors: {}
        };
    }

    validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if(!this.state.firstName) {
            errors["firstName"] = "*Enter first name";
            formIsValid = false;
        }

        if(!this.state.lastName) {
            errors["lastName"] = "*Enter last name";
            formIsValid = false;
        }

        this.setState({
            errors: errors
        })

        return formIsValid
    }

    goToSignUpPage2 = () => {
        if(this.validateForm()){
            this.props.navigation.navigate('SignUpPage2',{
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
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
                    Create a Fundoo Account
                </Text>

                <Text style={styles.subTitle}>
                    Enter your name
                </Text>

                <View style={styles.inputContainer}>


                    <View style={styles.inputView}>
                        <OutlinedTextField
                            testID="testFirstName"
                            label="First name"
                            value={this.state.firstName}
                            onChangeText={(firstName)=>this.setState({firstName})}
                            error={this.state.errors.firstName}
                            errorColor='red'
                        />
                    </View>

                    <View style={styles.inputView2}>
                        <OutlinedTextField
                            testID="testLastName"
                            label="Last name"
                            value={this.state.lastName}
                            onChangeText={(lastName)=>this.setState({lastName})}
                            error={this.state.errors.lastName}
                            errorColor='red'
                        />
                    </View> 

                </View>

                <View style={styles.nextInSignUp}>
                        <Button 
                            testID="testNextButton1"
                            title="Next"
                            onPress={this.goToSignUpPage2}
                        />
                </View>

            </View>
        );
    }
}
