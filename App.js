/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { Initializer, MapView, Location } from "./BaiduMap/";
const { Marker } = MapView;

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android: "Double tap R on your keyboard to reload,\n" + "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.cluster = null;
    Initializer.init("tNqGxpG367N0mUhFsCI54BxYnWLsGNzY").catch(e => console.error(e));
    this.locationInit();
    this.state = { location: null, center: { latitude: 39.2, longitude: 112.4 } };
  }
  async locationInit() {
    await Location.init();
    Location.addLocationListener(location => {
      console.warn(location);
      this.setState({ location, center: location });
      Location.stop();
    });
    Location.start();
  }
  renderMarker = markers => {
    return markers.map(item => <Marker onPress={() => console.warn(item)} {...item} />);
  };

  render() {
    const markers = [
      {
        image: "icon_dw_gz.png",
        coordinate: { latitude: 26.08689, longitude: 119.2687 },
        title: "烟感报警器JSM1"
      },
      {
        image: "icon_dw_gz.png",
        coordinate: { latitude: 26.08, longitude: 119.46 },
        title: "烟感报警器JSM2"
      },
      {
        image: "icon_dw_hj.png",
        coordinate: { latitude: 26.18689, longitude: 119.3687 },
        title: "烟感报警器JSM3"
      },
      {
        image: "icon_dw_ty.png",
        coordinate: { latitude: 26.28689, longitude: 119.2687 },
        title: "烟感报警器JSM4"
      },
      {
        image: "icon_dw_zc.png",
        coordinate: { latitude: 26.38689, longitude: 119.1687 },
        title: "烟感报警器JSM5"
      }
    ];
    return (
      <View style={styles.container}>
      <View style={{
        // marginTop:120
      }}>
      <Text>tasd</Text>
      </View>
      <MapView
        style={{
          flex:1
        }}
        onStatusChange={this.onStatusChange}
        location={this.state.location}
        center={this.state.center}
        locationEnabled
      >
        {this.renderMarker(markers)}
      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
