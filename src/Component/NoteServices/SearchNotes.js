import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles4 } from '../../Css/NoteService.style';
import model from '../../ModelServices/DashboardModel';
import NoteCard from './NoteCard';

function SearchNotes(props) {

    const uid = props.navigation.getParam('uid')
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [load, setLoad] = useState(true)
    const [notes, setNotes] = useState([])


    useEffect(() => {
        model.getAllNotes(uid, async (snap) => {
            setData(snap.reverse())
            setLoad(false)
        })
    }, [search])

    const searchFilter = (text) => {
        const notesArray = (data).filter((item) => {
            const itemTitle = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
            const itemContent = item.Content ? item.Content.toUpperCase() : ''.toUpperCase();
            const itemData = text.toUpperCase();
            return itemTitle.indexOf(itemData) > -1 || itemContent.indexOf(itemData) > -1
        });
        setSearch(text)
        setNotes(notesArray)
    }
    console.log(props)
    return (
        <View style={[styles4.noteServiceContainer, { backgroundColor: '#fff', }]}>
            <Appbar style={styles4.appBar}>
                <Appbar.BackAction
                    onPress={() => props.navigation.navigate('Notes')}
                />
                <TextInput
                    autoFocus={true}
                    style={{ fontSize: 18 }}
                    placeholder={'Search your notes'}
                    value={search}
                    onChangeText={text => searchFilter(text)}
                />
            </Appbar>
            {load ?

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color={'dodgerblue'} />
                </View> :

                search !== '' &&
                <View>
                    <FlatList
                        data={notes}
                        renderItem={
                            ({ item }) => <NoteCard
                                Item={item}
                                Navigate={props}
                                page={'Notes'}
                                uid={uid}
                            />
                        }
                        keyExtractor={item => item.noteId}
                    />
                </View>
            }

        </View>
    );

}

export default SearchNotes;
