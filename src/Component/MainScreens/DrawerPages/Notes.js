import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import Topbar from '../Dashboard/TopNavbar';
import Bottombar from '../Dashboard/BottomTabBar'
import { styles3 } from '../../../Css/MainScreens.style';
import NoteCard from '../../NoteServices/NoteCard';
import AnimatedLoader from "react-native-animated-loader";
import { Title } from 'react-native-paper';
import { connect } from "react-redux";
import model from "../../../ModelServices/DashboardModel"

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pinNotes: [],
            unpinNotes: [],
            load: false
        };
    }

    componentDidMount = () => {

        this.setState({ load: true })
        model.fetchNotes(this.props.uid, (pinNotes, unpinNotes) => {
            this.setState({
                pinNotes: pinNotes,
                unpinNotes: unpinNotes
            }, () => setTimeout(() => this.setState({ load: false }), 1000))
        },()=>{
            setTimeout(() => this.setState({ load: false }), 1000)
        })
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
                                    <Title style={[styles3.pinTitle, { marginTop: 0 }]}>PINNED</Title>
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
                                                uid={this.props.uid}
                                            />
                                        }
                                        keyExtractor={item => item.noteId}
                                    />
                                }
                            </View>
                            <View>
                                {
                                    this.state.pinNotes.length !== 0 && this.state.unpinNotes.length !== 0 &&
                                    <Title style={[styles3.pinTitle, { marginTop: 15, }]}>OTHERS</Title>
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


                <Bottombar {...this.props} page={'Notes'} />

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
)(Notes);