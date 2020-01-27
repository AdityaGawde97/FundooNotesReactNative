import React, { Component } from 'react';
import { View } from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import { Appbar, Avatar } from 'react-native-paper';
import Profile from '../../NoteServices/Profile';
export default class TopNavbar extends Component {
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
          style={styles2.topbarContainer}
        >
          <Appbar.Action size={24} icon="menu" color="#797979"
            onPress={this.props.navigation.openDrawer}
          />
          <Appbar.Content
            title="Search your notes"
            titleStyle={styles2.topbarTitle}
          />
          <Appbar.Action
            color={'#797979'}
            size={24}
            icon={!this.state.view ?
              require('../../../Assets/list_view.png') :
              require('../../../Assets/grid_view.png')
            }
            onPress={() => this.setState({ view: !this.state.view })}
            style={{ right: 9 }}
          />
          <Profile {...this.props} />
        </Appbar>

      </View>
    );
  }
}
