import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { styles2, globleStyle } from '../../../Css/DashboardCss';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: ''
    };
  }

  getOrientation = () => {
    if (this.refs.rootView) {
      if (Dimensions.get('window').width < Dimensions.get('window').height) {
        this.setState({ orientation: true });
      }
      else {
        this.setState({ orientation: false });
      }
    }
  }

  componentDidMount() {
    this.getOrientation();

    Dimensions.addEventListener('change', () => {
      this.getOrientation();
    });
  }

  render() {
    return (
      <View style={styles2.bottomBarContainer} ref = "rootView">
        <View
          style={styles2.bottomBarIconsContainer}
        >
          <TouchableOpacity>
            <AntDesign
              name="checksquareo"
              style={styles2.bottomBarIcons}
              color={globleStyle.inherit}
              size={globleStyle.bottomBarIconsSize}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="md-brush"
              style={styles2.bottomBarIcons}
              size={globleStyle.bottomBarIconsSize}
              color={globleStyle.inherit}
            />
          </TouchableOpacity>
          <TouchableOpacity>

            <Feather
              name="mic"
              style={styles2.bottomBarIcons}
              size={globleStyle.bottomBarIconsSize}
              color={globleStyle.inherit}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              name="image-outline"
              style={styles2.bottomBarIcons}
              size={globleStyle.bottomBarIconsSize}
              color={globleStyle.inherit}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[styles2.cutOutStyle, { right: this.state.orientation ? '30%' : '54%' }]}
        >
        </View>
        <View
          style={styles2.fabStyle}
        >
          <TouchableOpacity
            onPress={() => alert('hi')}
            style={styles2.fabTouchable}
          >
            <Image
              source={require('../../../Assets/add.png')}
              style={styles2.fabIcon}
            />
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}

