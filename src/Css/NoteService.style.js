import { StyleSheet } from 'react-native';

export const styles4 = StyleSheet.create({

    noteServiceContainer: {
        flex: 1,
    },

    appBar: {
        backgroundColor: 'transparent',
        elevation: 0,
    },

    appbarTitle: {
        fontSize: 20,
        color: '#484848',
        fontFamily: 'Roboto',
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
    },

    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 12
    },

    labelInput: {
        width: '70%',
        fontSize: 18
    },

    label: { fontSize: 18, top: 8, width: '70%' },

    focusLine: {
        borderBottomColor: 'lightgray',
        borderTopColor: 'lightgray',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    }

});