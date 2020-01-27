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
import { Chip, Icon } from 'material-bread';

export default class NoteCreator extends Component {
    constructor(props) {
        super(props);
        this.Item = this.props.navigation.getParam('noteObj', null)
        this.page = this.props.navigation.getParam('backToPage')
        this.state = {
            bgColor: this.Item === null ? '#ffffff' : this.Item.BgColor,
            title: this.Item === null ? '' : this.Item.Title,
            note: this.Item === null ? '' : this.Item.Content,
            pin: this.Item === null ? false : this.Item.Pin,
            archive: this.Item === null ? false : this.Item.Archive,
            trash: this.Item === null ? false : this.Item.Trash,
            dateField: this.Item === null ? null : this.Item.ReminderDate === undefined ? null : this.Item.ReminderDate,
            timeField: this.Item === null ? null : this.Item.ReminderTime === undefined ? null : this.Item.ReminderTime,
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
                    this.state.archive, this.state.trash, this.state.bgColor,
                    this.state.dateField, this.state.timeField,
                    () => {
                        this.props.navigation.navigate(this.page)
                    }
                )
            }
            else {
                this.props.navigation.navigate(this.page)
            }
        }
        else {
            updateNote(this.Item.noteId, this.state.title, this.state.note,
                this.state.pin, this.state.archive, this.state.trash,
                this.state.bgColor, this.state.dateField, this.state.timeField,
                () => {
                    this.props.navigation.navigate(this.page)
                }
            )
        }
    }

    render() {
        console.log(this.state.trash)
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
                    <SetReminder
                        getDateTime={
                            (date, time) => this.setState({
                                dateField: moment(date).format(),
                                timeField: time
                            })
                        }
                    />
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
                        multiline
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
                    <View>
                        {
                            this.Item === null ?
                                this.state.dateField !== null &&
                                <Chip
                                    style={styles4.chipStyle}
                                    text={
                                        moment(this.state.dateField).format('MMM D')
                                        + ', ' + this.state.timeField
                                    }
                                    chipStyle='outlined'
                                    leftIcon={<Icon name='alarm' size={20} color={globalStyle.inherit} />}
                                    onDelete={() => this.setState({
                                        dateField: null,
                                        timeField: null
                                    })}
                                />
                                :
                                this.state.timeField !== null &&
                                <Chip
                                    ref={(refs) => this.chipRef = refs}
                                    style={styles4.chipStyle}
                                    text={
                                        moment(this.state.dateField).format('MMM D')
                                        + ', ' + this.state.timeField
                                    }
                                    chipStyle='outlined'
                                    leftIcon={<Icon name='alarm' size={20} color={globalStyle.inherit} />}
                                    onDelete={() => this.setState({
                                        dateField: null,
                                        timeField: null
                                    })}
                                    visible={true}
                                />
                        }
                    </View>
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
                        trash={this.state.trash}
                        setTrash={() => this.setState({ trash: true })}
                        pushNoteData={this.pushNoteData}
                    />
                </Appbar>
            </View>
        );
    }
}

