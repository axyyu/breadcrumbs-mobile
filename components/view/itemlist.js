import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, WebSocket, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

import TimeTracker from "../timetracker";

import io from 'socket.io-client';

var pickupLines = [
"Are you a time traveler? Cause I see you in my future!",
"Are you sure you’re not a parking ticket? Because you’ve got fine written all over you",
"Please call an ambulance, your beauty is killing me!",
"If you were a sea i would swim in you forever.",
"Roses are red, violets are blue, it would be a shame if I couldn’t date you!",
"Do you play soccer? Because you’re a keeper!",
"“I have a boyfriend” – Well you look like the kind of girl who could use two",
"I’m going to have to ask you to leave. You’re making the other girls look bad.",
"Are you a 45 degree angle? Because you’re acute-y!",
"Do you drink Pepsi? Because you’re so-da-licious!",
"8 Planets, 1 Universe, 1.735 billion people, and i end up with you",
"Roses are red violets are blue, I can’t rhyme but can I date you?",
"My love for you is like dividing by zero. It’s undefinable.",
"Are you mexican? Because you’re my juan and only!",
"Do you like star wars? Because yoda only one for me!",
"Are your eyes ike? Because i’m lost in them!"
]

export default class ItemList extends React.Component {
    static navigationOptions = {header:null};

    constructor(props){
        super(props);
        this.pickupLine = Math.floor(Math.random() * pickupLines.length);
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

                var d = false;
                if(c.hold==="False"){
                    d=true;
                    for(var b = items.length-1; b>=0; b--){
                        if(c.time == items[b].time){
                            d=false;
                            break;
                        }
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
    var list;

    if(this.state.itemLog.length > 0){
        list = <FlatList
          data={this.state.itemLog}
          style={styles.itemlist}
          keyExtractor={ (item, index) => item.time }
          renderItem={({item}) => <TimeTracker {...item} navigation={this.props.navigation} /> }
          />
    }
    else{
        list = <View>
        <Text style={styles.nothing}>{pickupLines[this.pickupLine] }</Text>
        <Text style={styles.afterthought}>{"You don't have any items recorded. Pick up some objects!"}</Text>
        </View>;
    }
    return (
      <View style={styles.container}>
          <Image
              style={[styles.logo,this.state.border]}
              source = {this.state.image}
          />
          {list}
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
  },
  nothing:{
      textAlign: "center",
      fontSize: 30,
      color: "#333533",
      marginTop:50,
      fontFamily: "HiMelody-Regular",
      marginHorizontal: "10%"
  },
  afterthought:{
      textAlign: "center",
      fontSize: 15,
      color: "#333533",
      marginTop:150,
      fontFamily: "WorkSans-Light",
      marginHorizontal: "10%"
  }
});
