import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { styles3 } from '../../../Css/MainScreens.style';
import Topbar from '../Dashboard/Topbar';
import AnimatedLoader from "react-native-animated-loader";
import NoteCard from '../../NoteServices/NoteCard';
import model from '../../../ModelServices/DashboardModel';
import { connect } from 'react-redux';

class Archive extends Component {
    constructor(props) {
        super(props);
        this.page = props.navigation.getParam('page')
        this.state = {
            load: true,
            notes: []
        };
    }

    componentDidMount = () => {
        this.setState({ load: true })
        model.fetchArchiveOrTrashNotes(this.props.uid, 'Archive', (notes) => {
            this.setState({
                notes: notes
            }, () => setTimeout(() => this.setState({ load: false }), 1000))
        }, () => setTimeout(() => this.setState({ load: false }), 1000))
    };

    render() {
        return (
            <View style={styles3.container}>
                <Topbar {...this.props} page={this.page} />
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
                <View style={{ height: '90%' }}>
                    <ScrollView>
                        <View>
                            {
                                this.state.notes.length !== 0 &&
                                <FlatList
                                    data={this.state.notes}
                                    renderItem={
                                        ({ item }) => <NoteCard
                                            page={'Archive'}
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
)(Archive);
