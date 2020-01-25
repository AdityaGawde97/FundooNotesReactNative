import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

/************************************ Sign Up Page Css ***********************************/

    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
        top: '3%'
    },

    passIconView: {
        flex: 0,
        flexDirection: 'row',
        top: '6%',
        justifyContent: 'center'
    },



    passView2: {
        top: '1.5%'
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