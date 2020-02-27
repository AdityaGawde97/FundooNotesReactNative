import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { StackNavigator } from './StackNavigator';
import { DrawerNavigator } from './DrawerNavigator';
import { Transition } from 'react-native-reanimated';
import SplashScreen from '../Component/SplashScreen';
import { ServiceNavigator } from './ServiceNavigator';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import LockScreen from '../Component/LockScreen';

const ServiceRoute = createStackNavigator(
    {
        Drawer: { screen: DrawerNavigator, navigationOptions: { headerShown: false, } },
        Service: { screen: ServiceNavigator, navigationOptions: { headerShown: false }, path: 'noteservice' }
    },
    {
        initialRouteName: 'Drawer',
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS
        },
    }
)

const SwitchNavigator = createAnimatedSwitchNavigator(
    {
        
        Splash: { screen: SplashScreen },
        Auth: { screen: StackNavigator },
        Service: { screen: ServiceRoute, path: 'service' },
        Lock: { screen: LockScreen }
    },
    {
        initialRouteName: 'Splash',
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="fade"
                    durationMs={500}
                    interpolation="easeIn"
                />
                <Transition.In type="scale" interpolation="easeOut" durationMs={500} />
            </Transition.Together>
        ),
    }
);

export default createAppContainer(SwitchNavigator);
