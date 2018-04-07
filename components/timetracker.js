import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class TimeTracker extends React.Component {
    constructor(props){
        super(props);
        this.state = {"time":0};
    }
    clicked(){

    }
  render() {
    return (
      <TouchableOpacity style={styles.container} onClick={this.clicked.bind(this)}>
        <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text style={styles.loc}>{this.props.currentLocation}</Text>
            </View>
            <Text style={styles.time}>{this.state.time}</Text>
        </View>
      </TouchableOpacity>
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
  },
  row:{
      flexDirection:"row"
  },
  col:{
      flexDirection:"column"
  },
  name:{

  },
  loc:{

  },
  time:{

  }
});
