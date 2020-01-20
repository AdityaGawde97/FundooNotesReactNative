import React, { Component } from 'react';
import { View } from 'react-native';
import { styles2 } from '../../../Css//DashboardCss';
import { Appbar, Avatar } from 'react-native-paper';
export default class TopNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false
    };
  }

  stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  }

  render() {
    return (
      <View style={styles2.container}>
        <Appbar
          style={styles2.topbarContainer}
        >
          <Appbar.Action size={25} icon="menu" color="#797979"
            onPress={this.props.MainProps.navigation.openDrawer}
          />
          <Appbar.Content
            title="Search your notes"
            titleStyle={styles2.topbarTitle}
          />
          <Appbar.Action
            color={'#797979'}
            size={25}
            icon={!this.state.view ?
              require('../../../Assets/list_view.png') :
              require('../../../Assets/grid_view.png')
            }
            onPress={() => this.setState({ view: !this.state.view })}
            style={{ right: 12 }}
          />
          <Avatar.Text
            label={'A'}
            size={38}
            style={{ right: 10, backgroundColor: this.stringToColor('Aditya') }}
            color={'#ffffff'}
          />
        </Appbar>

      </View>
    );
  }
}
