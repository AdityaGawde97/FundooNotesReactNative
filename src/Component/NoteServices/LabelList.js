import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { styles4 } from '../../Css/NoteService.style';
import { IconButton } from 'react-native-paper';
import { globalStyle } from '../../Css/GlobalStyle.style';
import model from '../../ModelServices/DashboardModel';

const LabelList = (props) => {

    const [focus, setFocus] = useState(false);
    const [labelName, setLabelName] = useState(props.Label)

    return (
        <View>
            <View style={[styles4.listItem, focus && styles4.focusLine]}>
                <IconButton
                    icon={!focus ? "label-outline" : 'trash-can-outline'}
                    color={globalStyle.inherit}
                    size={25}
                    onPress={!focus ?
                        () => setFocus(true)
                        : () => {
                            setFocus(false)
                            model.removeLabel(props.uid, props.labelId)
                        }
                    }
                />
                <TextInput
                    style={styles4.labelInput}
                    placeholder={'Edit Label Name'}
                    value={labelName}
                    onChangeText={labelName => setLabelName(labelName)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => props.Label === labelName ? setFocus(false) : null}
                    autoFocus={focus}
                />
                <IconButton
                    icon={!focus ? "pencil" : 'check'}
                    color={!focus ? globalStyle.inherit : 'dodgerblue'}
                    size={25}
                    onPress={!focus ?
                        () => setFocus(true)
                        : () => {
                            setFocus(false)
                            model.updateLabel(props.uid, props.labelId, labelName)
                        }
                    }
                />
            </View>
        </View>
    );
};

export default LabelList;