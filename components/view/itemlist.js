import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, WebSocket, BackHandler } from 'react-native';
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
            "itemLog":[],
            "image":require("../../imgs/logo.png")
        }
    }
    componentDidMount(){
        // this.back();
        var socket = new io('http://breadcrumbs.sites.tjhsst.edu/');
        socket.on("mapUpdate", (output)=>{
            var items = []
            for(var a = output.events.length-1; a>=0; a--){
                if(items.length >= 5){
                    break;
                }
                let c = output.events[a];
                var d = true;
                for(var b = items.length-1; b>=0; b--){
                    if(c.time == items[b].time){
                        d=false;
                        break;
                    }
                }
                if(d){
                    items.push(c);
                }
            }
            this.setState({"itemLog":items || []});
        });
        socket.on("statusChange", (output)=>{
            let hold = output.hold;
            let time = output.time;
            // console.log(hold, time);
            var i = hold == "True" ? 1 : 0;
            // console.log(i);
            if(i){
                this.setState({"image":require("../../imgs/item.png")});
            }
            else{
                this.setState({"image":require("../../imgs/logo.png")});
            }

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
                    this.currentHeld = i;
                }
            }, (pos_err)=>console.log(pos_err));
        });
    }
  render() {
      console.log(this.state.itemLog)
    return (
      <View style={styles.container}>
          <Image
              style={[styles.logo,this.state.border]}
              source = {this.state.image}
          />
          <FlatList
            data={this.state.itemLog}
            style={styles.itemlist}
            keyExtractor={ (item, index) => item.time }
            renderItem={({item}) => <TimeTracker {...item} navigation={this.props.navigation} /> }
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
      paddingBottom: 50
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
  },
  itemlist:{
      marginTop:50,
      width: "100%",
      paddingHorizontal: "5%"
  }
});
