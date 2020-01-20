import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer"
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { Image, StyleSheet, Dimensions } from 'react-native';
import SignUpPage1 from '../Component/Login/SignUpPage1';
import SignUpPage2 from '../Component/Login/SignUpPage2';
import SignUpPage3 from '../Component/Login/SignUpPage3';
import SignIn from "../Component/Login/SignIn"
import ForgotPassword from "../Component/Login/ForgotPassword";
import Dashboard from '../Component/MainScreens/Dashboard/Dashboard';
import Notes from '../Component/MainScreens/Notes';
import Reminder from '../Component/MainScreens/Reminder';
import Archive from '../Component/MainScreens/Archive';
import Trash from '../Component/MainScreens/Trash';
import CountChart from '../Component/MainScreens/CountChart';
import ContentComponent from '../Component/MainScreens/Dashboard/ContentComponent'

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

const StackNavigator = createStackNavigator(
    {
        SignIn: { screen: SignIn, navigationOptions: { headerShown: false } },
        SignUpPage1: { screen: SignUpPage1, navigationOptions: { headerShown: false } },
        SignUpPage2: { screen: SignUpPage2, navigationOptions: { headerShown: false } },
        SignUpPage3: { screen: SignUpPage3, navigationOptions: { headerShown: false } },
        ForgotPassword: { screen: ForgotPassword, navigationOptions: { headerShown: false } },
        Dashboard: { screen: Dashboard, navigationOptions: { headerShown: false } },
    }
)

const DrawerNavigation = createDrawerNavigator(
    {
        Notes: {
            screen: Notes,
            navigationOptions: {
                drawerLabel: 'Notes',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/AddBox.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                ),
            }
        },
        Reminder: {
            screen: Reminder,
            navigationOptions: {
                drawerLabel: 'Reminder',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/AddBox.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                ),
            }
        },
        CountChart: {
            screen: CountChart,
            navigationOptions: {
                drawerLabel: 'CountChart',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/AddBox.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                ),
            }
        },
        Archive: {
            screen: Archive,
            navigationOptions: {
                drawerLabel: 'Archive',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/AddBox.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                ),
            }
        },
        Trash: {
            screen: Trash,
            navigationOptions: {
                drawerLabel: 'Trash',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/AddBox.png')}
                        style={[styles.icon, { tintColor: tintColor }]}
                    />
                ),
            }
        },
    },
    {
        contentComponent: ContentComponent,
        drawerWidth: 320,
    }
)

const SwitchNavigation = createSwitchNavigator(
    {
        stack: { screen: StackNavigator, navigationOptions: { headerShown: false } },
        drawer: { screen: DrawerNavigation, navigationOptions: { headerShown: false } }
    },
    {
        initialRouteName: 'drawer',
        // transition: (
        //     <Transition.Together>
        //         <Transition.Out
        //             type="slide-bottom"
        //             durationMs={200}
        //             interpolation="easeIn"
        //         />
        //         <Transition.In type="slide-top" durationMs={200} />
        //     </Transition.Together>
        // ),
    }
)

const AppNavigator = createAppContainer(SwitchNavigation);

export default AppNavigator