import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import HomeScreen from '../Component/HomeScreen'
import SignUpPage1 from '../Component/Login/SignUpPage1';
import SignUpPage2 from '../Component/Login/SignUpPage2';
import SignUpPage3 from '../Component/Login/SignUpPage3';
import SignIn from "../Component/Login/SignIn"
import ForgotPassword from "../Component/Login/ForgotPassword";
import Dashboard from '../Component/MainScreens/Dashboard/Dashboard';

const Navigator = createStackNavigator(
    {
        // HomeScreen: { screen: HomeScreen, navigationOptions: { headerShown: false } },
        // SignIn: { screen: SignIn, navigationOptions: { headerShown: false } },
        // SignUpPage1: { screen: SignUpPage1, navigationOptions: { headerShown: false } },
        // SignUpPage2: { screen: SignUpPage2, navigationOptions: { headerShown: false } },
        // SignUpPage3: { screen: SignUpPage3, navigationOptions: { headerShown: false } },
        // ForgotPassword: { screen: ForgotPassword, navigationOptions: { headerShown: false } },
        Dashboard: { screen: Dashboard, navigationOptions: { headerShown: false } },
    }, 
);

const AppNavigator = createAppContainer(Navigator);

export default AppNavigator