import React from 'react';
import styles from './DrawerCSS.style'
import { View, Text, TouchableHighlight, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const DrawerTitle = (props) => {
    return (
        <>
            {
                props.text !== undefined &&
                <View
                    style={[{ marginVertical: 20, marginHorizontal: 20 }, props.viewStyle !== undefined ? props.viewStyle : {}]}
                >
                    <Text style={[{
                        color: props.color !== undefined ? props.color : 'black',
                        fontSize: props.fontSize !== undefined ? props.fontSize : 20,
                    }, props.style !== undefined ? props.style : {}]}>
                        {props.text}
                    </Text>
                </View>
            }
        </>
    );
}

export const DrawerItem = (props) => {
    return (
        <>
            {
                props.text !== undefined &&
                <TouchableHighlight
                    underlayColor={props.underlayColor !== undefined ? props.underlayColor : 'lightgray'}
                    onPress={props.onPress !== undefined ? props.onPress : () => { }}
                    style={props.highlightStyle !== undefined ? props.highlightStyle : {}}
                >
                    <View style={[styles.row, props.containerStyle !== undefined ? props.containerStyle : {}]}>
                        {
                            props.icon !== undefined &&
                            <MaterialIcons
                                color={props.iconColor !== undefined ? props.iconColor : 'gray'}
                                size={props.iconSize !== undefined ? props.iconSize : 25}
                                name={props.icon}
                            />

                        }
                        {
                            props.image !== undefined &&
                            <Image
                                source={props.image}
                                style={{
                                    width: props.iconSize !== undefined ? props.iconSize : 25,
                                    height: props.iconSize !== undefined ? props.iconSize : 25
                                }}
                                
                            />

                        }
                        <Text style={[{ left: 15, }, props.textStyle !== undefined ? props.textStyle : { fontSize: 18 }]}>
                            {props.text}
                        </Text>
                    </View>
                </TouchableHighlight>

            }

        </>
    );
}

export const Divider = () => {
    return (
        <>
            <View style={{
                borderColor: 'lightgray',
                borderWidth: 1,
                width: '100%'
            }}>

            </View>
        </>
    );
}
