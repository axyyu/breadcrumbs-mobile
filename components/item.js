import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Item extends React.Component {
    constructor(props){
        super(props);

    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      margin: 10,
      borderColor: '#F6BD60',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
  },
  name:{
      fontSize: 20
  }
});
