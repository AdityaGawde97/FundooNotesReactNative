import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles4 } from '../../Css/NoteService.style';
import { Appbar } from 'react-native-paper';
import { globalStyle } from '../../Css/GlobalStyle.style';
import { TextInput } from 'react-native';
import MoreOption from './MoreOption'
import moment from 'moment'
import { createNote, updateNote } from '../../Firebase/DatabaseServices';
import SetReminder from './SetReminder';

export default class NoteCreator extends Component {
    constructor(props) {
        super(props);
        this.Item = this.props.navigation.getParam('noteObj', null)

        this.state = {
            bgColor: this.Item === null ? '#ffffff' : this.Item.BgColor,
            title: this.Item === null ? '' : this.Item.Title,
            note: this.Item === null ? '' : this.Item.Content,
            pin: this.Item === null ? false : this.Item.Pin,
            archive: this.Item === null ? false : this.Item.Archive,
        };
    }

    changeColor = (color) => {
        this.setState({
            bgColor: color
        })
    }

    pushNoteData = () => {

        if (this.Item === null) {
            if (this.state.title !== '' || this.state.note !== '') {
                createNote(this.state.title, this.state.note, this.state.pin,
                    this.state.archive, this.state.bgColor,
                    () => {
                        this.props.navigation.navigate('Notes')
                    }
                )
            }
            else {
                this.props.navigation.navigate('Notes')
            }
        }
        else {
            updateNote(this.Item.noteId, this.state.title, this.state.note,
                this.state.pin, this.state.archive, this.state.bgColor,
                () => {
                    this.props.navigation.navigate('Notes')
                }
            )
        }
    }

    render() {
        console.log(this.Item);

        return (
            <View style={[styles4.noteServiceContainer, { backgroundColor: this.state.bgColor }]}>

                <Appbar style={styles4.appBar}>
                    <Appbar.BackAction
                        color={globalStyle.inherit}
                        size={globalStyle.noteIconSize}
                        onPress={this.pushNoteData}
                    />
                    <Appbar.Content />
                    <Appbar.Action
                        icon={!this.state.pin ? "pin-outline" : "pin"}
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                        onPress={() => this.setState({ pin: !this.state.pin })}
                    />
                    {/* <Appbar.Action
                        icon={require('../../Assets/alert.png')}
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                    /> */}
                    <SetReminder/>
                    <Appbar.Action
                        icon={!this.state.archive ?
                            require('../../Assets/archive.png') :
                            require('../../Assets/unarchive.png')
                        }
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                        onPress={() => this.setState({ archive: !this.state.archive })}
                    />
                </Appbar>

                <View style={styles4.noteServiceContainer}>
                    <TextInput
                        style={styles4.textInput1}
                        placeholder="Title"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8a8a8a"
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                    />
                    <TextInput
                        style={styles4.textInput2}
                        placeholder="Note"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#8a8a8a"
                        value={this.state.note}
                        onChangeText={(note) => this.setState({ note })}
                        multiline
                    />
                </View>
                <Appbar style={{ backgroundColor: this.state.bgColor }}>
                    <Appbar.Action
                        icon={require('../../Assets/AddBox.png')}
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                    />
                    <Appbar.Content
                        title={`Edited ${moment().format('LT')}`}
                        titleStyle={
                            {
                                fontSize: 14,
                                color: globalStyle.inherit,
                                textAlign: 'center',
                                fontFamily: 'san-serif-thin',
                                left: -5
                            }
                        }
                    />
                    <MoreOption
                        bgColor={this.state.bgColor}
                        changeColor={this.changeColor}
                    />
                </Appbar>
            </View>
        );
    }
}

