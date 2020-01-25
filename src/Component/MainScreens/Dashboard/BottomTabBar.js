import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyle } from '../../../Css/GlobalStyle.style';
import { useDeviceOrientation } from "react-native-hooks";

export default function BottomTabBar(props) {

  const orientation = useDeviceOrientation()

  return (
    <View style={styles2.bottomBarContainer}>
      <View
        style={styles2.bottomBarIconsContainer}
      >
        <TouchableOpacity>
          <AntDesign
            name="checksquareo"
            style={styles2.bottomBarIcons}
            color={globalStyle.inherit}
            size={globalStyle.size25}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="md-brush"
            style={styles2.bottomBarIcons}
            size={globalStyle.size25}
            color={globalStyle.inherit}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="mic"
            style={styles2.bottomBarIcons}
            size={globalStyle.size25}
            color={globalStyle.inherit}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="image-outline"
            style={styles2.bottomBarIcons}
            size={globalStyle.size25}
            color={globalStyle.inherit}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[styles2.cutOutStyle, { right: !orientation.landscape ? '32%' : '59%' }]}
      >
      </View>
      <View style={styles2.fabStyle}>
        <TouchableOpacity
          style={styles2.fabTouchable}
          hitSlop={{ top: 200, bottom: 200, left: 200, right: 200 }}
          onPress={()=>props.navigation.navigate('NoteCreator')}
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

