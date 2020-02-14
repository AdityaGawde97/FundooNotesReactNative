import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { styles4 } from '../../Css/NoteService.style';
import { Appbar } from 'react-native-paper';
import { globalStyle } from '../../Css/GlobalStyle.style';
import { TextInput } from 'react-native';
import MoreOption from './MoreOption'
import moment from 'moment';
import SetReminder from './SetReminder';
import { Chip, Icon } from 'material-bread';
import TrashMoreOption from './TrashMoreOption';
import model from '../../ModelServices/DashboardModel';
import Toast from '../../NativeModules/ToastModule';
import PushNotification from 'react-native-push-notification';
import { not } from 'react-native-reanimated';
//import Mailer from 'react-native-mail';

export default class NoteCreator extends Component {
    constructor(props) {
        super(props);
        this.Item = props.navigation.getParam('noteObj', null)
        this.page = props.navigation.getParam('backToPage')
        this.uid = props.navigation.getParam('uid')
        this.state = {
            bgColor: this.Item === null ? '#ffffff' : this.Item.BgColor,
            title: this.Item === null ? '' : this.Item.Title,
            note: this.Item === null ? '' : this.Item.Content,
            pin: this.Item === null ? false : this.Item.Pin,
            archive: this.Item === null ? false : this.Item.Archive,
            trash: this.Item === null ? false : this.Item.Trash,
            dateField: this.Item === null ? null : this.Item.ReminderDate === undefined ? null : this.Item.ReminderDate,
            timeField: this.Item === null ? null : this.Item.ReminderTime === undefined ? null : this.Item.ReminderTime,
            uniqueId: Date.now()
        };
    }

    changeColor = (color) => {
        this.setState({
            bgColor: color
        })
    }

    localNotification = () => {
        if (this.state.dateField !== null && this.state.timeField !== null) {
            let date = JSON.stringify(this.state.dateField).slice(1, 11)
            let time = JSON.stringify(this.state.timeField).slice(11, 25)
            let schedule = new Date(date + time)
            PushNotification.localNotificationSchedule({
                id: this.state.uniqueId,
                message: this.state.title,
                date: schedule
            });
        }
    }

    pushNoteData = async () => {
        await this.props.navigation.navigate('DisplayNotes', { 'page': this.page })
        if (this.Item === null) {
            if (this.state.title !== '' || this.state.note !== '') {
                if (this.state.archive === true) {
                    this.setState({ pin: false })
                }
                
                model.createNote(this.uid, this.state,
                    (noteId) => {
                        let labelsArray = this.props.navigation.getParam('selectedLabel', null)
                        if (labelsArray !== null) {
                            (labelsArray).map((data) => {
                                model.addLabel(this.uid, noteId, data.labelId, data.label)
                            })
                        }
                        Toast.show('Note created successfully', Toast.LONG)
                        this.localNotification()
                        
                    }
                )
            }
            else {
                Toast.show('Empty note discarded', Toast.LONG)
                //this.props.navigation.navigate('DisplayNotes', { 'page': this.page })
            }
        }
        else {
            model.editNote(this.uid, this.Item.noteId, this.state,
                () => {
                    Toast.show('Note edited successfully', Toast.LONG)
                    //this.localNotification()
                    //this.props.navigation.navigate('DisplayNotes', { 'page': this.page })
                }
            )
        }
    }

    trashAndRestore = (trash) => {
        if (this.Item !== null) {
            model.trashOrRestore(this.uid, this.Item.noteId, trash, () => {
                this.props.navigation.navigate(this.page)
            })
        }
        else {
            this.props.navigation.navigate('DisplayNotes', { 'page': this.page })
        }
    }

    archivedAndUnarchived = () => {
        this.setState({
            archive: !this.state.archive,
        }, () => {
            if (this.Item !== null) {
                if (this.state.archive === true) {
                    model.archivedTheNote(this.uid, this.Item.noteId,
                        () => {
                            if (this.Item.Pin) {
                                Toast.show('Note archived and unpinned', Toast.LONG)
                            }
                            else {
                                Toast.show('Note archived', Toast.LONG)
                            }
                            this.props.navigation.navigate('DisplayNotes', { 'page': this.page })
                        })
                }
            }
        })
    }

    // handleEmail = () => {
    //     Mailer.mail({
    //       subject: 'need help',
    //       recipients: ['support@example.com'],
    //       body: '<b>A Bold Body</b>',
    //       isHTML: true,
    //     }, (error, event) => {
    //       Alert.alert(
    //         error,
    //         event,
    //         [
    //           {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
    //           {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
    //         ],
    //         { cancelable: true }
    //       )
    //     });
    //   }

    render() {

        let labelsArray = this.props.navigation.getParam('selectedLabel', null)

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
                        style={{ display: this.page === 'Trash' ? 'none' : 'flex' }}
                    />
                    <SetReminder
                        getDateTime={
                            (date, time) => this.setState({
                                dateField: date,
                                timeField: time
                            })
                        }
                        page={this.page}
                    />
                    <Appbar.Action
                        icon={!this.state.archive ?
                            require('../../Assets/archive.png') :
                            require('../../Assets/unarchive.png')
                        }
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                        onPress={this.archivedAndUnarchived}
                        style={{ display: this.page === 'Trash' ? 'none' : 'flex' }}
                    />
                </Appbar>

                <View style={styles4.noteServiceContainer}>
                    {
                        this.page !== 'Trash' ?
                            <View>
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
                            </View> :
                            <View>
                                <Text style={styles4.textInput1}>
                                    {this.state.title}
                                </Text>
                                <Text style={styles4.textInput1}>
                                    {this.state.note}
                                </Text>
                            </View>
                    }

                    <View>
                        {
                            this.Item === null ?
                                <View
                                    style={
                                        {
                                            marginTop: 30,
                                            marginLeft: 15,
                                            flexDirection: 'row',
                                            flexWrap: 'wrap'
                                        }
                                    }
                                >
                                    {
                                        this.state.dateField !== null &&
                                        <Chip
                                            style={styles4.chipStyle}
                                            text={
                                                moment(this.state.dateField).format('MMM D')
                                                + ', ' + moment(this.state.timeField).format('hh:mm a')
                                            }
                                            chipStyle='outlined'
                                            leftIcon={<Icon name='alarm' size={20} color={globalStyle.inherit} />}
                                            onDelete={async () => {
                                                await PushNotification.cancelLocalNotifications({ id: this.state.uniqueId });
                                                this.setState({
                                                    dateField: null,
                                                    timeField: null
                                                })
                                            }
                                            }
                                        />
                                    }
                                    {
                                        labelsArray !== null &&
                                        (labelsArray).map((data) => (
                                            <Chip
                                                text={data.label}
                                                style={styles4.chipStyle}
                                                chipStyle='outlined'
                                            />
                                        ))
                                    }
                                </View>
                                :
                                <View
                                    style={
                                        {
                                            marginTop: 30,
                                            marginLeft: 15,
                                            flexDirection: 'row',
                                            flexWrap: 'wrap'
                                        }
                                    }
                                >
                                    {
                                        this.state.timeField !== null &&
                                        <Chip
                                            ref={(refs) => this.chipRef = refs}
                                            style={styles4.chipStyle}
                                            text={
                                                moment(this.state.dateField).format('MMM D')
                                                + ', ' + moment(this.state.timeField).format('hh:mm a')
                                            }
                                            chipStyle='outlined'
                                            leftIcon={<Icon name='alarm' size={20} color={globalStyle.inherit} />}
                                            onDelete={() => this.setState({
                                                dateField: null,
                                                timeField: null
                                            })}
                                            visible={true}
                                            disabled={this.page === 'Trash'}
                                        />
                                    }
                                    {
                                        this.Item.NoteLabels !== undefined &&
                                        Object.getOwnPropertyNames(this.Item.NoteLabels).map((labelId) => (
                                            <Chip
                                                text={this.Item.NoteLabels[labelId].LabelName}
                                                style={styles4.chipStyle}
                                                chipStyle='outlined'
                                            />
                                        ))
                                    }
                                </View>
                        }
                    </View>
                </View>
                <Appbar style={{ backgroundColor: this.state.bgColor }}>
                    <Appbar.Action
                        icon={require('../../Assets/AddBox.png')}
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                        onPress={
                            () => Linking.openURL(`mailto:?subject=Open Note&body=
                            fundoonotes://service/noteservice/notecreator/${this.Item}
                            
                            `)
                        }
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
                    {
                        this.page !== 'Trash' ?
                            <MoreOption
                                bgColor={this.state.bgColor}
                                changeColor={this.changeColor}
                                trashAndRestore={this.trashAndRestore}
                                uid={this.uid}
                                Item={this.Item}
                                {...this.props}
                                labelsData={labelsArray}

                            /> :
                            <TrashMoreOption
                                bgColor={this.state.bgColor}
                                noteId={this.Item.noteId}
                                trashAndRestore={this.trashAndRestore}
                                deleteForever={() => {
                                    Toast.show('Note deleted forever', Toast.LONG)
                                    model.deleteForever(this.uid, this.Item.noteId, () => {
                                        this.props.navigation.navigate(this.page)
                                    })
                                }}
                            />
                    }

                </Appbar>
            </View>
        );
    }
}

