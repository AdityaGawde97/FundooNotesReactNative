import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import Topbar from '../Dashboard/Topbar';
import Bottombar from '../Dashboard/BottomTabBar'
import { styles3 } from '../../../Css/MainScreens.style';
import NoteCard from '../../NoteServices/NoteCard';
import AnimatedLoader from "react-native-animated-loader";
import { Title } from 'react-native-paper';
import { connect } from "react-redux";
import model from "../../../ModelServices/DashboardModel"

class DisplayNotes extends Component {
    constructor(props) {
        super(props);
        //this.page = props.navigation.getParam('page')
        this.state = {
            page: props.navigation.getParam('page'),
            pinNotes: [],
            notes: [],
            unpinNotes: [],
            reminderNotes: [],
            load: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            page: props.navigation.getParam('page')
        }
    }

    fetchNotesForNotespage = () => {
        model.fetchNotes(this.props.uid, (pinNotes, unpinNotes) => {
            this.setState({
                pinNotes: pinNotes,
                unpinNotes: unpinNotes,
                load: false
            })
        }, () => this.setState({ load: false }))
    }

    fetchNotesForReminderpage = () => {
        model.fetchReminderNotes(this.props.uid, (notes) => {
            this.setState({
                unpinNotes: notes,
                load: false
            })
        }, () => this.setState({ load: false }))
    }

    fetchNotesForArchiveOrTrashpage = () => {
        model.fetchArchiveOrTrashNotes(this.props.uid, this.state.page, (notes) => {
            this.setState({
                unpinNotes: notes,
                load: false
            })
        }, (notes) => this.setState({ load: false }))
    }

    fetchNotesAsPerPage = () => {
        if (this.state.page === 'Notes') {
            this.fetchNotesForNotespage();
        }
        else if (this.state.page === 'Reminder') {
            this.fetchNotesForReminderpage();
        }
        else {
            this.fetchNotesForArchiveOrTrashpage();
        }
    }

    componentDidMount = () => {
        this.setState({ load: true })
        this.fetchNotesAsPerPage();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.page !== this.state.page) {
            this.setState({ load: true })
            this.fetchNotesAsPerPage();
        }
    }

    render() {
        
        return (
            <View style={styles3.container}>

                <Topbar {...this.props} page={this.state.page} />

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
                                    this.state.pinNotes.length !== 0 && this.state.page === 'Notes' &&
                                    <Title style={[styles3.pinTitle, { marginTop: 0 }]}>PINNED</Title>
                                }
                                {
                                    this.state.pinNotes.length !== 0 && this.state.page === 'Notes' &&
                                    <FlatList
                                        data={this.state.pinNotes}
                                        renderItem={
                                            ({ item }) => <NoteCard
                                                Item={item}
                                                Navigate={this.props}
                                                page={'Notes'}
                                                uid={this.props.uid}
                                            />
                                        }
                                        keyExtractor={item => item.noteId}
                                    />
                                }
                            </View>
                            <View>
                                {
                                    this.state.pinNotes.length !== 0 &&
                                    this.state.unpinNotes.length !== 0 &&
                                    this.state.page === 'Notes' &&
                                    <Title style={[styles3.pinTitle, { marginTop: 15, }]}>OTHERS</Title>
                                }
                                {
                                    this.state.unpinNotes.length !== 0 &&
                                    this.state.page === 'Reminder' &&
                                    <Title style={styles3.pinTitle}>UPCOMING</Title>
                                }

                                {
                                    this.state.unpinNotes.length !== 0 &&
                                    <FlatList
                                        data={this.state.unpinNotes}
                                        renderItem={
                                            ({ item }) => <NoteCard
                                                Item={item}
                                                Navigate={this.props}
                                                page={this.state.page}
                                                uid={this.props.uid}
                                            />
                                        }
                                        keyExtractor={item => item.noteId}

                                    />
                                }

                            </View>
                        </View>
                    </ScrollView>
                </View>


                <Bottombar {...this.props} page={this.state.page} />

            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        uid: state.userID.uid
    };
}

export default connect(
    mapStateToProps
)(DisplayNotes);