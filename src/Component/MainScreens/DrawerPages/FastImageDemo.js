import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';

export default class FastImageDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(100)).map((v, i) => {
      return { id: i, src: 'https://unsplash.it/400/400?image=' + (i + 1) };
    }); 
    that.setState({
      dataSource: items,
    });
  }
  render() {

    return (

      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <FastImage
                style={styles.imageThumbnail}
                source={{
                  uri: item.src,
                  priority: FastImage.priority.high,
                }}
                // onLoadStart={() => { this.setState({ loading: true }) }}
                // onLoadEnd={() => { this.setState({ loading: false }) }}
              >
                {/* <ActivityIndicator animating={this.state.loading} color="white" /> */}
              </FastImage>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});

