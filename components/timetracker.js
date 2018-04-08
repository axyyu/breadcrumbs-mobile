import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import moment from 'moment';

export default class TimeTracker extends React.Component {
    static navigationOptions = {header:null};
    constructor(props){
        super(props);
        console.log(props);
        this.state = {time: moment(this.props.time).format("M-D-YY, H:m:s")};
    }
    openMap(){
        console.log(this.props);
        this.props.navigation.navigate('ItemMap', {
            lat:this.props.lat,
            lng:this.props.lng,
            time:this.props.time
        })
    }
  render() {
        return (
          <TouchableOpacity style={styles.container} onPress={this.openMap.bind(this)}>
            <Text style={styles.name}>{this.state.time}</Text>
            <View style={styles.loccontainer}>
                <Text style={styles.loc}>{"Lat: " + String(this.props.lat).slice(0,7)}</Text>
                <Text style={styles.loc}>{"Lng: " + String(this.props.lng).slice(0,7)}</Text>
            </View>
          </TouchableOpacity>
            );
        }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingHorizontal: 20,
      margin: 10,
      height: 60,
      borderColor: '#F6BD60',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
  },
  name:{
      fontSize:20,
      fontFamily:"WorkSans-Bold"
  },
  loc:{
      fontSize:15,
      fontFamily:"WorkSans-Light"
  },
  loccontainer:{
      flexDirection:"column",
      height:"100%",
      justifyContent:"space-around",
      paddingVertical:10
  }
});
