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
            pinNotes: null,
            unpinNotes: null,
            load: false,
            view: false
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

    toggleListAndGrid = () => {
        this.setState({ view: !this.state.view })
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

        const loader = (
            <AnimatedLoader
                visible={this.state.load}
                overlayColor="transparent"
                source={require("../../../Assets/loader.json")}
                animationStyle={{
                    width: 300,
                    height: 300
                }}
                speed={1}
            />
        );

        const renderPinNotes = (
            <FlatList
                data={this.state.pinNotes}
                renderItem={
                    ({ item }) => <NoteCard
                        Item={item}
                        Navigate={this.props}
                        page={'Notes'}
                        uid={this.props.uid}
                        view={this.state.view}
                    />
                }
                keyExtractor={item => item.noteId}
                numColumns={!this.state.view ? 1 : 2}
                key={!this.state.view ? 1 : 2}
            />
        );

        const renderUnpinNotes = (
            <FlatList
                data={this.state.unpinNotes}
                renderItem={
                    ({ item }) => <NoteCard
                        Item={item}
                        Navigate={this.props}
                        page={this.state.page}
                        uid={this.props.uid}
                        view={this.state.view}
                    />
                }
                keyExtractor={item => item.noteId}
                numColumns={!this.state.view ? 1 : 2}
                key={!this.state.view ? 1 : 2}

            />
        );

        return (
            <View style={styles3.container}>

                <Topbar
                    {...this.props}
                    page={this.state.page}
                    view={this.state.view}
                    toggleListAndGrid={this.toggleListAndGrid}
                />

                {loader}


                <View style={{ height: '80%' }}>
                    <ScrollView>
                        <View>
                            {
                                this.state.pinNotes !== null && this.state.page === 'Notes' &&
                                <View>
                                    <Title style={[styles3.pinTitle, { marginTop: 0 }]}>PINNED</Title>
                                    {renderPinNotes}
                                </View>

                            }

                            {
                                this.state.unpinNotes !== null &&
                                <View>
                                    {
                                        this.state.pinNotes !== null &&
                                        this.state.page === 'Notes' &&
                                        <Title style={[styles3.pinTitle, { marginTop: 15, }]}>OTHERS</Title>
                                    }
                                    {
                                        this.state.page === 'Reminder' &&
                                        <Title style={styles3.pinTitle}>UPCOMING</Title>
                                    }
                                    {renderUnpinNotes}
                                </View>
                            }

                        </View>
                    </ScrollView>
                </View>

                {
                    this.state.page === 'Notes' &&
                    <Bottombar {...this.props} page={this.state.page} />
                }


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