import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import Topbar from '../Dashboard/TopNavbar';
import Bottombar from '../Dashboard/BottomTabBar'
import { styles3 } from '../../../Css/MainScreens.style';
import { getNotes } from '../../../Firebase/DatabaseServices';
import NoteCard from '../../NoteServices/NoteCard';
import AnimatedLoader from "react-native-animated-loader";
import { Title } from 'react-native-paper';

export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pinNotes: [],
            unpinNotes: [],
            load: true
        };
    }

    componentDidMount = () => {
        getNotes(async (snapObj) => {
            let pinNotes = [];
            let unpinNotes = [];
            if (snapObj !== null && snapObj !== undefined) {
                await Object.getOwnPropertyNames(snapObj).map((key) => {
                    snapObj[key].noteId = key
                    if (snapObj[key].Pin === true) {
                        pinNotes.push(snapObj[key])
                    }
                    else if (snapObj[key].Pin === false) {
                        unpinNotes.push(snapObj[key])
                    }
                });
                this.setState({
                    pinNotes: pinNotes.reverse(),
                    unpinNotes: unpinNotes.reverse()
                    //load: false
                }, () => setTimeout(() => this.setState({ load: false }), 1000))
            }
            else {
                setTimeout(() => this.setState({ load: false }), 2000)
            }
        });
    };

    render() {

        return (
            <View style={styles3.container}>

                <Topbar {...this.props} />

                <AnimatedLoader
                    visible={this.state.load}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../../../Assets/loader.json")}
                    animationStyle={{
                        width: 300,
                        height: 300
                    }}
                    speed={1}
                />


                <View style={{ height: '80%' }}>
                    <ScrollView>
                        <View>
                            <View>
                                {
                                    this.state.pinNotes.length !== 0 &&
                                    <Title style={styles3.pinTitle}>PINNED</Title>
                                }
                                {
                                    this.state.pinNotes.length !== 0 &&
                                    <FlatList
                                        data={this.state.pinNotes}
                                        renderItem={
                                            ({ item }) => <NoteCard
                                                Item={item}
                                                Navigate={this.props}
                                                page={'Notes'}
                                            />
                                        }
                                        keyExtractor={item => item.noteId}
                                    />
                                }
                            </View>
                            <View>
                                {
                                    this.state.pinNotes.length !== 0 && this.state.unpinNotes.length !== 0 &&
                                    <Title style={styles3.pinTitle}>OTHERS</Title>
                                }

                                {
                                    this.state.unpinNotes.length !== 0 &&
                                    <FlatList
                                        data={this.state.unpinNotes}
                                        renderItem={
                                            ({ item }) => <NoteCard
                                                Item={item}
                                                Navigate={this.props}
                                                page={'Notes'}
                                            />
                                        }
                                        keyExtractor={item => item.noteId}

                                    />
                                }

                            </View>
                        </View>
                    </ScrollView>
                </View>


                <Bottombar {...this.props} page={'Notes'} />

            </View>
        );
    }
}