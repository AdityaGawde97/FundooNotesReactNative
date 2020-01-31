import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { globalStyle } from '../../Css/GlobalStyle.style'
import { IconButton } from 'react-native-paper';
import { Dialog, Icon, Button } from 'material-bread';
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment';
import { styles4 } from '../../Css/NoteService.style';

export default class SetReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dateModel: false,
            timeModel: false,
            dateField: moment().format('MMMM D'),
            dateField2: moment().format(),
            timeField: moment().add(2, 'h').format('h:m a')
        };
    }

    closeDialog = () => {
        this.setState({ visible: false })
    }

    render() {

        const renderDateModel = (
            <DateTimePicker
                isVisible={this.state.dateModel}
                mode='date'
                onConfirm={(date) => this.setState({
                    dateField: moment(date).format("MMMM D"),
                    dateField2: moment(date).format(),
                    dateModel: false
                })}
                onCancel={() => this.setState({ dateModel: false })}
            />
        );

        const renderTimeModel = (
            <DateTimePicker
                isVisible={this.state.timeModel}
                mode='time'
                onConfirm={(time) => this.setState({
                    timeField: moment(time).format("h:m a"),
                    timeModel: false
                })}
                onCancel={() => this.setState({ timeModel: false })}
            />
        );

        const renderDialogBox = (
            <Dialog
                visible={this.state.visible}
                onTouchOutside={this.closeDialog}
                title={'Add Reminder'}
                style={
                    {
                        width: Dimensions.get('window').width,
                        paddingBottom: 50,
                    }
                }
            >

                <View style={{ paddingBottom: 20 }}>
                    <TouchableHighlight
                        style={styles4.dateTimeView}
                        onPress={() => this.setState({ dateModel: true })}
                        underlayColor='white'
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16 }}>
                                {this.state.dateField}
                            </Text>
                            <Icon
                                name='arrow-drop-down'
                                size={30}
                                color={globalStyle.inherit}
                            />
                        </View>
                    </TouchableHighlight>

                </View>
                <View style={{ paddingBottom: 20 }}>
                    <TouchableHighlight
                        style={styles4.dateTimeView}
                        underlayColor='white'
                        onPress={() => this.setState({ timeModel: true })}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16 }}>
                                {this.state.timeField}
                            </Text>
                            <Icon
                                name='arrow-drop-down'
                                size={30}
                                color={globalStyle.inherit}
                            />
                        </View>
                    </TouchableHighlight>
                    <View
                        style={
                            {
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                                top: 50
                            }
                        }
                    >
                        <Button
                            text={'Cancel'}
                            type='text'
                            textColor="black"
                            useInputCasing
                            style={{ marginRight: 10, }}
                            onPress={this.closeDialog}
                        />
                        <Button
                            text={'Save'}
                            type={'contained'}
                            textColor='black'
                            color='#ffab03'
                            useInputCasing
                            onPress={
                                () => {
                                    this.props.getDateTime(this.state.dateField2, this.state.timeField)
                                    this.closeDialog()
                                }
                            }
    
                        />
                    </View>
                </View>

            </Dialog>
        );
        return (
            <>
                <IconButton
                    icon={require('../../Assets/alert.png')}
                    size={globalStyle.size25}
                    color={globalStyle.inherit}
                    onPress={() => this.setState({ visible: true })}
                    style={{display: this.props.page === 'Trash' ? 'none' : 'flex'}}
                />
                {renderDialogBox}
                {renderDateModel}
                {renderTimeModel}
            </>
        );
    }
}
