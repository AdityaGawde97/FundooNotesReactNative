import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { globalStyle } from '../../Css/GlobalStyle.style';
import { Dialog, Select } from 'material-bread';

export default function SetReminder() {

    const [state, setState] = useState({
        visible: false,
        selectDate: '',
    })

    const data = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
    ];

    const renderSetReminder = (
        <>
            <Dialog
                visible={state.visible}
                onTouchOutside={() => setState({ visible: false })}
                title={'Add reminder'}
            >
                <View>
          
                </View>
            </Dialog>
        </>
    );

    return (
        <>
            <IconButton
                icon={require('../../Assets/alert.png')}
                size={globalStyle.noteIconSize}
                color={globalStyle.inherit}
                onPress={() => setState({ visible: !state.visible })}
            />
            {renderSetReminder}
        </>
    );

}
