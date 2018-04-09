import React from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';

export default class ItemMap extends React.Component {
    static navigationOptions = {header:null};
    constructor(props){
        super(props);
        this.props = this.props.navigation.state.params;
        this.state={
          "region": {
            latitude: this.props.lat,
            longitude: this.props.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          "markers":[
              {
                  key: this.props.time,
                  title: "Item",
                  description: "The last tracked position of this object",
                  latlng: {
                      latitude:this.props.lat,
                      longitude:this.props.lng
                  }
              }
          ],
          "points":[
              {latitude: this.props.lat,
              longitude: this.props.lng,}
          ]
        };
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((pos)=>{
            let coord = pos.coords;

            // this.onRegionChange({
            //     latitude: coord.latitude,
            //     longitude: coord.longitude,
            //     latitudeDelta: 0.001,
            //     longitudeDelta: 0.001,
            // });
            var points = this.state.points;
            points.push(
                {
                    latitude:coord.latitude,
                    longitude:coord.longitude
                }
            )
            this.setState({points});
        }, (pos_err)=>console.log(pos_err));
    }
    onRegionChange(region) {
        this.setState({ region });
    }
  render() {
      console.log(this.state);
    return (
      <View style={styles.container}>
      <MapView style={styles.map}
        showsUserLocation={true}
        zoomEnabled = {true}
        mapType="hybrid"
        customMapStyle={mapStyle}
        showsBuildings = {true}
        onRegionChange={this.onRegionChange.bind(this)}
        // onRef={ref => (ref.animateToViewingAngle(70, 10000))}
        initialRegion={this.state.region}>
        {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require('../../imgs/marker.png')}
            />
          ))}
    </MapView>
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

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
// <Polyline
//     coordinates={this.state.points}
//   strokeColor="#F6BD60" // fallback for when `strokeColors` is not supported by the map-provider
//   strokeWidth={6}
// />
