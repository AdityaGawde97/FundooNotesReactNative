import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { styles4 } from '../../../Css/NoteService.style';
import { Appbar, IconButton } from 'react-native-paper';
import { globalStyle } from '../../../Css/GlobalStyle.style';
import { connect } from 'react-redux';
import model from '../../../ModelServices/DashboardModel';
import LabelList from '../../NoteServices/LabelList';

class EditLabels extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnState: false,
            labelName: '',
            labelData: null
        };
    }

    componentDidMount = () => {
        model.getLabel(this.props.uid, (data) => {
            this.setState({ labelData: data })
        })
    };

    render() {

        const { btnState } = this.state

        return (
            <View style={[styles4.noteServiceContainer, { backgroundColor: '#fff', }]}>
                <Appbar style={styles4.appBar}>
                    <Appbar.BackAction
                        color={globalStyle.inherit}
                        size={globalStyle.size25}
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content
                        titleStyle={styles4.appbarTitle}
                        title="Edit labels"
                    />
                </Appbar>
                <View style={{ marginTop: 15 }}>
                    <View style={[styles4.listItem, btnState && styles4.focusLine]}>
                        <IconButton
                            icon={!btnState ? "plus" : 'close'}
                            color={globalStyle.inherit}
                            size={25}
                            onPress={() => this.setState({ btnState: !btnState })}
                        />
                        <TextInput
                            style={styles4.labelInput}
                            placeholder={'Create new label'}
                            autoFocus={btnState}
                            placeholderTextColor="#8a8a8a"
                            value={this.state.labelName}
                            onChangeText={labelName => this.setState({ labelName })}
                        />
                        <IconButton
                            icon={"check"}
                            color={globalStyle.inherit}
                            size={25}
                            style={{ opacity: btnState ? 1 : 0 }}
                            onPress={() => {
                                model.createLabel(this.props.uid, this.state.labelName)
                                this.setState({ labelName: '' })
                            }}
                        />
                    </View>
                    {
                        this.state.labelData !== null &&
                        <FlatList
                            data={this.state.labelData}
                            renderItem={({ item }) => <LabelList {...item} uid={this.props.uid} />}
                            keyExtractor={item => item.labelId}
                        />
                    }
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
)(EditLabels);
