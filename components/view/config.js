import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';

import io from 'socket.io-client';

// connected to myo...
// syncing to arm...
export default class Config extends React.Component {
    static navigationOptions = {header:null};
    constructor () {
        super();
    }
    componentDidMount() {
        this.socket = io('http://breadcrumbs.sites.tjhsst.edu/');
    }
  render() {
      const scaleText = this.animatedValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
            
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.status}</Text>
        </View>
        <View style={styles.imgContainer}>
            <Image
                style={styles.img}
                resizeMode={'contain'}
                source={require("../../imgs/myo.png")}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    backgroundColor: '#E8EDDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  textContainer:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  imgContainer:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  text:{
      fontSize: 20,
      color: "#333533",
      // display: "none",
  },
  img: {
      height: 100,
  }
});
