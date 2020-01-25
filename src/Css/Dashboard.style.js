import { StyleSheet } from 'react-native';

export const styles2 = StyleSheet.create({

    container: {
        flex: 0,
        height: 90,
    },

    bottomBarContainer: {
        flex: 0,
        backgroundColor: '#fff',
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },

    bottomBarIconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    cutOutStyle: {
        flex: 0,
        backgroundColor: 'white',
        width: 74,
        height: 36,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderBottomRightRadius: 200,
        borderBottomLeftRadius: 200,
        bottom: '0%'
    },

    fabStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 10,
        borderRadius: 1000,
        borderBottomWidth: 3,
        width: 73,
        height: 73,
        bottom: '45%',
        right: '3.9%',
        position: 'absolute',
    },

    fabTouchable: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 1000,
        width: 60,
        height: 60,
        elevation: 7,
        position: 'absolute',
        alignSelf: 'center',
        borderColor: '#ffffff',
        borderWidth: 5,
    },

    fabIcon: {
        width: 50,
        height: 50,
        flex: 1,
        alignSelf: 'center'
    },

    bottomBarIcons: {
        flex: 0,
        left: 10,
        margin: 10
    },

    topbarContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 0,
        margin: 18
    },

    topbarTitle: {
        fontSize: 16,
        color: '#797979',
        fontFamily: 'Roboto',
        right: 10
    },

    drawerTitle: {
        fontSize: 20,
        margin: 20
    },

    drawerItems: {
        fontSize: 17,
        left: 15,
    },

    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingLeft: 25
    }

})
