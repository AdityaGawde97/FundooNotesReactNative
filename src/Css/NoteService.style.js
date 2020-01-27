import { StyleSheet } from 'react-native';

export const styles4 = StyleSheet.create({

    noteServiceContainer: {
        flex: 1,
    },

    appBar: {
        backgroundColor: 'transparent',
        elevation: 0,
    },

    textInput1: {
        top: 28,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 22,
        fontWeight: '300',
        backgroundColor: 'transparent'
    },

    textInput2: {
        top: 25,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18,
        backgroundColor: 'transparent'
    },

    chipStyle: {
        top: 35,
        marginLeft: 25
    },

    moreTouchable: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    noteCard: {
        marginHorizontal: 10,
        marginTop: 10,
        borderColor: 'lightgray',
        borderRadius: 10,
        elevation: 0,
        paddingBottom: 10
        // width: '45%'
    },

    dateTimeView: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }

});