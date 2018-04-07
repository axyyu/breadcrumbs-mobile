import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';

// connected to myo...
// syncing to arm...
export default class Config extends React.Component {
    static navigationOptions = {header:null};
    constructor () {
      super()
      this.animatedValue1 = new Animated.Value(0)
      this.animatedValue2 = new Animated.Value(0)
      this.state = {status:""};
    }
    componentDidMount() {
        this.animate()
        setTimeout( () => this.props.navigation.navigate('ItemList'), 1000);
    }
    animate(){
        this.animatedValue1.setValue(0)
        this.animatedValue2.setValue(0)
        const createAnimation = function (value, duration, easing, delay = 0) {
        return Animated.timing(
          value,
          {
            toValue: 1,
            duration,
            easing,
            delay
          }
        )
        }
        Animated.parallel([
            createAnimation(this.animatedValue1, 1000, Easing.ease),
            createAnimation(this.animatedValue2, 1000, Easing.ease, 1000)
        ]).start();
    }
  render() {
      const scaleText = this.animatedValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={100} color="#068D9D" />
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
