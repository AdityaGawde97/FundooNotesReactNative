import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { styles3 } from '../../../Css/MainScreens.style';
import OtherTopbar from '../Dashboard/OtherTopbar';
import Bottombar from '../Dashboard/BottomTabBar'
import AnimatedLoader from "react-native-animated-loader";
import { getNotes } from '../../../Firebase/DatabaseServices';
import { Title } from 'react-native-paper';
import NoteCard from '../../NoteServices/NoteCard';

export default class Reminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            load: false,
            notes: []
        };
    }

    componentDidMount = () => {
        getNotes(async (snapObj) => {
            let notes = [];
            if (snapObj !== null && snapObj !== undefined) {
                await Object.getOwnPropertyNames(snapObj).map((key) => {
                    if (snapObj[key].ReminderDate !== undefined) {
                        snapObj[key].noteId = key;
                        notes.push(snapObj[key])
                    }
                });
            }
            this.setState({
                notes: notes,
            }, () => setTimeout(() => this.setState({ load: false }), 1000))
        })
    };

    render() {
        return (
            <View style={styles3.container}>
                <OtherTopbar {...this.props} page={'Reminders'} />
                <AnimatedLoader
                    visible={this.state.load}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../../../Assets/loader2.json")}
                    animationStyle={{
                        width: 300,
                        height: 300
                    }}
                    speed={1}
                />
                <View style={{ height: '80%' }}>
                    <ScrollView>
                        <View>
                            {
                                this.state.notes.length !== 0 &&
                                <Title style={styles3.pinTitle}>UPCOMING</Title>
                            }
                            {
                                this.state.notes.length !== 0 &&
                                <FlatList
                                    data={this.state.notes}
                                    renderItem={
                                        ({ item }) => <NoteCard
                                            page={'Reminder'}
                                            Item={item}
                                            Navigate={this.props}
                                        />
                                    }
                                    keyExtractor={item => item.noteId}
                                />
                            }
                        </View>
                    </ScrollView>
                </View>
                <Bottombar {...this.props} page={'Reminder'} />
            </View>
        );
    }
}
