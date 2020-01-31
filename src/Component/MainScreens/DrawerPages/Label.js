import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { styles3 } from '../../../Css/MainScreens.style';
import OtherTopbar from '../Dashboard/OtherTopbar';
import Bottombar from '../Dashboard/BottomTabBar'
import { Title } from 'react-native-paper';
import NoteCard from '../../NoteServices/NoteCard';
import { connect } from "react-redux";
import model from '../../../ModelServices/DashboardModel';

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            notes: [],
            labelPage: props.navigation.getParam('page'),
            labelId: props.navigation.getParam('labelId')
        };
    }

    static getDerivedStateFromProps(props, state) {
        return{
            ...state,
            labelPage: props.navigation.getParam('page'),
            labelId: props.navigation.getParam('labelId')
        }
    }

    componentDidMount = () => {
        this.setState({ load: true })

        model.fetchReminderNotes(this.props.uid, (notes) => {
            this.setState({
                notes: notes
            }, () => setTimeout(() => this.setState({ load: false }), 500))
        }, () => setTimeout(() => this.setState({ load: false }), 500))
    };

    render() {
        console.log(this.state.labelId);
        console.log(this.state.labelPage)
        return (
            <View style={styles3.container}>
                <OtherTopbar {...this.props} page={this.state.labelPage} />

                <View style={{ height: '90%' }}>
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
                                            page={'Label'}
                                            Item={item}
                                            Navigate={this.props}
                                            uid={this.props.uid}
                                        />
                                    }
                                    keyExtractor={item => item.noteId}
                                />
                            }
                        </View>
                    </ScrollView>
                </View>
                <Bottombar {...this.props} page={'Label'} />
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
)(Label);
