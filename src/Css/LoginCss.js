import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

/************************************ Sign Up Page Css ***********************************/

    mainContainer: {
        flex: 1,
    },

    appTitle: {
        flex: 0,
        fontSize: 26,
        alignSelf: 'center',
        fontFamily: 'Roboto',
        top: '4%',
    },

    createTitle: {
        flex: 0,
        alignSelf: 'center',
        fontSize: 24,
        top: '5%',
    },

    subTitle: {
        flex: 0,
        alignSelf: 'center',
        fontSize: 18,
        top: '6%',
    },

    inputContainer: {
        flex: 9,
        flexDirection: 'column',
        top: '5%',
        margin: '8%',
    },

    inputView2: {
        flex: 0,
        top: '5%'
    },

    passIconView: {
        flex: 0,
        flexDirection: 'row',
        top: '6%',
        justifyContent: 'center'
    },

    passIconViewInSignIn: {
        flex: 0,
        flexDirection: 'row',
        top: '3%',
        width: '100%',
    },

    passView: {
        flex: 0,
        top: '2%',
        width: '85%'
    },

    passView2: {
        flex: 0,
        width: '85%',
    },

    passIcon: {    
        flex: 0,    
        width: 35,
        height: 35,
    },

    nextInSignUp: {
        flex: 1,
        width: 180,
        alignSelf: 'flex-end',
        padding: '6%',
    },

});