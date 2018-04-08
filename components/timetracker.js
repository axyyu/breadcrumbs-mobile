import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import moment from 'moment';

export default class TimeTracker extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.coord = props.start;
        this.state = {
            "time":'',
            "lat":'',
            "long":''
        };
    }
    componentDidMount(){
        if(this.props.putDown.length <= 0){
            // setInterval(this.update.bind(this), 1000);
        }
        else{
            var dur = moment(props.putDown);
            let lat = str(Math.round(this.props.end.latitude));
            let long = str(Math.round(this.props.end.longitude));
            this.setState({"time":dur.format("M:D")});
        }
    }
    openMap(){
        this.props.navigation.navigate('ItemMap', {
            lat:this.coord.latitude,
            long:this.coord.longitude
        })
    }
    update(){
        var dur = moment() - moment(props.pickedUp);
        this.setState({time:dur.format("H:m:s")});
        navigator.geolocation.getCurrentPosition((pos)=>{
            this.coord = pos.coords;

            let lat = str(Math.round(coord.latitude));
            let long = str(Math.round(coord.longitude));
            this.setState({"lat":lat, "long":long});
        }, (pos_err)=>console.log(pos_err));
    }
  render() {
      if(this.props.putDown.length > 0){
          return(
              <TouchableOpacity style={styles.container} onClick={this.openMap.bind(this)}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <Text style={styles.loc}>{this.state.lat + " " + this.state.long}</Text>
                    </View>
                    <Text style={styles.time}>{this.state.time}</Text>
                </View>
              </TouchableOpacity>
          );
      }
      else{
        return (
          <TouchableOpacity style={styles.container} onClick={this.openMap.bind(this)}>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.name}>{this.props.name}</Text>
                    <Text style={styles.loc}>{this.state.lat + " " + this.state.long}</Text>
                </View>
                <Text style={styles.time}>{this.state.time}</Text>
            </View>
          </TouchableOpacity>
            );
          }
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
