import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Item from "../item";
import TimeTracker from "../timetracker";

export default class ItemList extends React.Component {
    static navigationOptions = {header:null};
    static itemKey = {"Can":0, "Phone":1, "Folder":2, "Idle":3}
    constructor(props){
        super(props)

        this.currentHeld = null;
        this.state = {
            "itemStatus":[
                {
                    name: 'Item',
                    held: false,
                },
                {
                    name: 'Idle',
                    held: false,
                }
            ],
            "itemLog":[
                {
                    name: 'Idle',
                    pickedUp: '',
                    putDown: '',
                    start: '',
                    end:''
                }
            ]
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((pos)=>console.log(pos), (pos_err)=>console.log(pos_err));
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Items</Text>
          <FlatList
            data={this.state.itemStatus}
            keyExtractor={ (item, index) => item.name }
            numColumns={2}
            renderItem={({item}) => <Item name={item.name} held={item.held} />}
        />
        <FlatList
          data={this.state.itemLog}
          keyExtractor={ (item, index) => item.name }
          renderItem={({item}) => <TimeTracker name={item.name} pickedUp={item.pickedUp} putDown={item.putDown}
          start={item.start} end={item.end}
          />}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 100,
      backgroundColor: '#E8EDDF',
      alignItems: 'center',
      justifyContent: 'center',
  },
  header:{
      fontSize: 10
  }
});
