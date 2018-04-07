import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Landing extends React.Component {
    static navigationOptions = {header:null};
    componentDidMount(){
        // check if server is up
        setTimeout( () => this.props.navigation.navigate('ItemMap'), 1000);
    }
  render() {
      const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
            style={styles.logo}
            source = {require("../../imgs/logo.png")}
        />
        <Text style={styles.name}>breadcrumbs</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EDDF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    height: 200,
    width: 200,
    marginVertical: 20
  },
  name:{
      fontSize: 30,
      color: "#333533"
  }
});
