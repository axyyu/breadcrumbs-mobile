import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MapView from 'react-native-maps';

export default class ItemMap extends React.Component {
    static navigationOptions = {header:null};
    constructor(props){
        super(props);
        this.state=this.getInitialState();
    }
    getInitialState() {
      return {
        "region": {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      };
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((pos)=>{
            let coord = pos.coords;

            this.onRegionChange({
                latitude: coord.latitude,
                longitude: coord.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            });
        }, (pos_err)=>console.log(pos_err));
    }
    onRegionChange(region) {
        this.setState({ region });
    }
  render() {
    return (
      <View style={styles.container}>
      <MapView style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={false}
        zoomEnabled = {true}
        showsBuildings = {true}
        onRegionChange={this.onRegionChange.bind(this)}
        onRef={ref => (ref.animateToViewingAngle(65, 60000))}
        initialRegion={this.state.region}
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
