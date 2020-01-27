import React, { Component } from 'react';
import { View } from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import { Appbar } from 'react-native-paper';
import Profile from '../../NoteServices/Profile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default class OtherTopbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false
        };
    }

    render() {
        return (
            <View style={styles2.container}>
                <Appbar
                    style={styles2.otherContainer}
                >
                    <Appbar.Action size={24} icon="menu" color="#797979"
                        onPress={this.props.navigation.openDrawer}
                    />
                    <Appbar.Content
                        title={this.props.page}
                        titleStyle={styles2.otherTitle}
                    />
                    <Appbar.Action
                        color={'#797979'}
                        size={25}
                        icon={require('../../../Assets/search.png')}
                        style={{ right: 5 }}
                    />
                    <Appbar.Action
                        color={'#797979'}
                        size={25}
                        icon={!this.state.view ?
                            require('../../../Assets/list_view.png') :
                            require('../../../Assets/grid_view.png')
                        }
                        onPress={() => this.setState({ view: !this.state.view })}
                        style={{ right: 5 }}
                    />
                </Appbar>

            </View>
        );
    }
}
