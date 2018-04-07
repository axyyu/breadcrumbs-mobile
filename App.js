import React from 'react';
import { StackNavigator } from 'react-navigation';

import Landing from './components/view/landing';
import ItemMap from './components/view/map';
import Config from './components/view/config';
import ItemList from './components/view/itemlist';

import { PermissionsAndroid } from 'react-native';
async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Use of Fine Location',
        'message': 'Breadcrumbs requires fine location access to identify the exact location of your items.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}


const Nav = StackNavigator({
  Home: {
    screen: Landing
  },
  Config: {
    screen: Config
  },
  ItemList:{
      screen:ItemList
  },
  ItemMap: {
    screen: ItemMap
  },
},
{
  headerMode: 'screen'
}
);

export default class App extends React.Component {
  render() {
    return <Nav />;
  }
}
