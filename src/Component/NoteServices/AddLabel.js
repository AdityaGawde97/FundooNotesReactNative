import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles4 } from '../../Css/NoteService.style';
import { globalStyle } from '../../Css/GlobalStyle.style';
import model from '../../ModelServices/DashboardModel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';

const AddLabel = (props) => {

    const uid = props.navigation.getParam('uid')
    const noteObj = props.navigation.getParam('Note')
    const [search, setSearch] = useState('');
    const [labels, setLabels] = useState([])

    useEffect(() => {
        model.getLabel(uid, (data) => {
            setLabels(data)
        })
    }, [])

    return (
        <View style={[styles4.noteServiceContainer, { backgroundColor: '#fff', }]}>
            <Appbar style={{ backgroundColor: '#fff', elevation: 6 }} >
                <Appbar.BackAction
                    color={globalStyle.inherit}
                    size={globalStyle.size25}
                    onPress={() => props.navigation.navigate('NoteCreator')}
                />

                <TextInput
                    style={{ width: '80%', fontSize: 18 }}
                    placeholder={'Enter label name'}
                    value={search}
                    onChangeText={search => setSearch(search)}
                />
            </Appbar>
            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={labels}
                    renderItem={({ item }) => <CheckList {...item} noteObj={noteObj} />}
                    keyExtractor={item => item.labelId}
                />

            </View>

        </View>
    );
};

const CheckList = (props) => {

    const [check, setCheck] = useState(false)
    return (
        <View style={styles4.listItem}>
            <Icon
                name={'label-outline'}
                size={26}
                color={globalStyle.inherit}
            />
            <Text style={styles4.labelInput}>{props.Label}</Text>
            <CheckBox
                containerStyle={{ top: -10 }}
                checked={check}
                checkedIcon={
                    <Icon name="check-box" size={26} color={'dodgerblue'} />
                }
                uncheckedIcon={
                    <Icon name="check-box-outline-blank" size={26} color={globalStyle.inherit} />
                }
                checkedColor='red'
                onPress={
                    () => {
                        setCheck(!check)
                    }
                }
            />
        </View>
    );
}

export default AddLabel;

