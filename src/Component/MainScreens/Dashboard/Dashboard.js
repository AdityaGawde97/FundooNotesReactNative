import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles2 } from '../../../Css/MainScreensCss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles2.container}>
        <Text> Dashboard </Text>
      </View>
    );
  }
}
