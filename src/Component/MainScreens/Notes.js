import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Topbar from './Dashboard/TopNavbar';
import Bottombar from './Dashboard/BottomTabBar'

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Topbar MainProps={this.props} />
        <Bottombar />
      </View>
    );
  }
}