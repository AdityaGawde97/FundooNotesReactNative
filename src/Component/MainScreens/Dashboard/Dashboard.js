import React, { Component } from 'react';
import { View } from 'react-native';
import { styles2 } from '../../../Css//DashboardCss';
import Icon from 'react-native-vector-icons/Ionicons'
import TopNavbar from './TopNavbar';
import BottomTabBar from "./BottomTabBar";
import { BreadProvider } from 'material-bread';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles2.container}>
        <TopNavbar />
        <BreadProvider>
          <BottomTabBar />
        </BreadProvider>

      </View>
    );
  }
}
