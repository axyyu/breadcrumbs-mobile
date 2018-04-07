import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MapView from 'react-native-maps';

export default class ItemMap extends React.Component {
    static navigationOptions = {header:null};
  render() {
    return (
      <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 38.9937392,
          longitude: -76.9470219,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
/>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'blue',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
