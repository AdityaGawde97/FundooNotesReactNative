import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import SignIn from "../Component/Authentication/SignIn";
import ForgotPassword from "../Component/Authentication/ForgotPassword";
import SignUpPage1 from "../Component/Authentication/SignUpPage1";
import SignUpPage2 from "../Component/Authentication/SignUpPage2";
import SignUpPage3 from "../Component/Authentication/SignUpPage3";
//import NoteCreator from '../Component/NoteServices/NoteCreator'; 

export const StackNavigator = createStackNavigator(
    {
        SignIn: { screen: SignIn, navigationOptions: { headerShown: false } },
        ForgotPassword: { screen: ForgotPassword, navigationOptions: { headerShown: false } },
        SignUpPage1: { screen: SignUpPage1, navigationOptions: { headerShown: false } },
        SignUpPage2: { screen: SignUpPage2, navigationOptions: { headerShown: false } },
        SignUpPage3: { screen: SignUpPage3, navigationOptions: { headerShown: false } },
        //NoteCreator: { screen: NoteCreator, navigationOptions: { headerShown: false } },
    },
    {
        initialRouteName: 'SignIn',
    }
);
