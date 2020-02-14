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
    const [selectedLabel, setSelectedLabels] = useState([]);

    const sendSelectedLabel = (label) => {
        setSelectedLabels([...selectedLabel, label])
    }

    const spliceSelectedLabel = (label) => {
        let labelsArray = [...selectedLabel]
        let stringifyArray = []
        labelsArray.map((item)=>(
            stringifyArray.push(JSON.stringify(item))
        ))
        let index = stringifyArray.indexOf(JSON.stringify(label))
        if (index !== -1) {
            labelsArray.splice(index, 1);
            setSelectedLabels(labelsArray);
        }
    }

    useEffect(() => {
        model.getLabel(uid, (data) => {
            setLabels(data)
        })
    }, [])
    console.log(props.noteObj,'vxdhzgfcdgz');
    

    return (
        <View style={[styles4.noteServiceContainer, { backgroundColor: '#fff', }]}>
            <Appbar style={{ backgroundColor: '#fff', elevation: 6 }} >
                <Appbar.BackAction
                    color={globalStyle.inherit}
                    size={globalStyle.size25}
                    onPress={() => props.navigation.navigate('NoteCreator',
                    {
                        selectedLabel: selectedLabel
                    })}
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
                    renderItem={
                        ({ item }) =>
                            <CheckList
                                {...item}
                                noteObj={noteObj}
                                uid={uid}
                                sendSelectedLabel={sendSelectedLabel}
                                spliceSelectedLabel={spliceSelectedLabel}
                            />

                    }
                    keyExtractor={item => item.labelId}
                />

            </View>

        </View>
    );
};

const CheckList = (props) => {

    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (props.noteObj !== null && props.noteObj !== undefined) {
            model.desireNote(props.uid, props.noteObj.noteId, (note) => {
                if (note.NoteLabels !== null && note.NoteLabels !== undefined) {
                    Object.getOwnPropertyNames(note.NoteLabels).map((key) => (
                        key === props.labelId &&
                        setCheck(true)
                    ))
                }
                else {
                    setCheck(false)
                }
            })
        }

    }, [check])

    const checkBoxOnPress = () => {
        if (!check) {
            if (props.noteObj !== undefined && props.noteObj !== null) {
                model.addLabel(props.uid, props.noteObj.noteId, props.labelId, props.Label)

            }
            else {
                setCheck(true)
                props.sendSelectedLabel({ 'labelId': props.labelId, 'label': props.Label })
            }
        }
        else {
            if (props.noteObj !== undefined && props.noteObj !== null) {
                model.findLabeledNoteId(props.noteObj.noteId, props,
                    (labeledNoteId) => {
                        model.removeLabel(props.uid, props.noteObj.noteId, props.labelId, labeledNoteId)
                    })
            }
            else {
                setCheck(false)
                props.spliceSelectedLabel({ 'labelId': props.labelId, 'label': props.Label })
            }
        }
    }



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
                onPress={checkBoxOnPress}
            />
        </View>
    );
}

export default AddLabel;

