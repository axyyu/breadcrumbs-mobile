import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, BackHandler, WebSocket } from 'react-native';
import { StackNavigator } from 'react-navigation';

import TimeTracker from "../timetracker";

import io from 'socket.io-client';


export default class ItemList extends React.Component {
    static navigationOptions = {header:null};

    constructor(props){
        super(props);

        this.currentHeld = null;
        this.itemKey = {0:"Idle", 1:"Item"};
        this.state = {
            "itemStatus":[
                {
                    name: 'Idle',
                    held: false,
                },
                {
                    name: 'Item',
                    held: false,
                }
            ],
            "itemLog":[
            ],
            "border":null
        }
    }
    back(){
        BackHandler.addEventListener('hardwareBackPress', function() {
          BackHandler.exitApp();
        });
    }
    componentDidMount(){
        this.back();
        const socket = io('http://breadcrumbs.sites.tjhsst.edu/');
        socket.on('statusChange', (output)=>{
            console.log(this.state.itemLog);
            let hold = output.hold;
            let time = output.time;
            // console.log(hold, time);
            var i = hold == "True" ? 1 : 0;
            // console.log(i);
            if(i){
                this.setState({"border":styles.border});
            }
            else{
                this.setState({"border":styles.noborder});
            }


            var itemStatus = this.state["itemStatus"];

            itemStatus[i].held = true;
            itemStatus[(i+1)%2].held = false;
            // console.log(itemStatus);
            this.setState({itemStatus});

            navigator.geolocation.getCurrentPosition((pos)=>{
                let coord = pos.coords;
                // console.log(coord);
                fetch('http://breadcrumbs.sites.tjhsst.edu/coords', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    hold: hold,
                    time: time,
                    lat: coord.latitude,
                    lng: coord.longitude,
                  }),
                });

                if(i != this.currentHeld){
                    if(this.currentHeld){
                        var itemLog = this.state["itemLog"];
                        itemLog[0].putDown = time;
                        itemLog[0].end = coord;
                        this.setState({itemLog});
                    }
                    this.currentHeld = i;
                    if(i){
                        this.createNewItem(i, time, coord);
                    }
                }
            }, (pos_err)=>console.log(pos_err));
        });
    }
    createNewItem(hold, time, location){
        var item = {
            name: this.itemKey[hold],
            pickedUp: time,
            putDown: '',
            start: location,
            end:''
        }
        var itemLog = this.state["itemLog"];
        itemLog.unshift(item);
        this.setState({itemLog});
        // console.log(this.state);
    }
  render() {
    return (
      <View style={styles.container}>
          <Image
              style={[styles.logo,this.state.border]}
              source = {require("../../imgs/item.png")}
          />
          <FlatList
            data={this.state.itemLog}
            keyExtractor={ (item, index) => item.name }
            renderItem={({item}) => <TimeTracker name={item.name} pickedUp={item.pickedUp} putDown={item.putDown}
            start={item.start} end={item.end} /> }
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
      fontSize: 20
  },
  logo:{
      height:100,
      width:100
  },
  border:{
      borderWidth: 1,
      borderColor: "green"
  },
  noborder:{
      borderWidth: 0
  }
});
