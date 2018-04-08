import React from 'react';
import { StyleSheet, Text, Image, View, ActivityIndicator, NetInfo, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Landing extends React.Component {
    static navigationOptions = {header:null};
    constructor(){
        super();
        this.state = {"loading":true};
    }
    componentDidMount(){
        NetInfo.getConnectionInfo().then((connectionInfo)=>{
            console.log(connectionInfo);
            if(connectionInfo.type === "wifi" || connectionInfo.type === "cellular"){
                this.setState({"loading":false});
                setTimeout(()=>this.props.navigation.navigate('ItemList'), 1000);
            }
        });
    }

  render() {
      const { navigate } = this.props.navigation;

      var next;
      if(this.state.loading){
          next = <ActivityIndicator size={30} color="#068D9D" />;
      }
      else{
          next = <Button style={styles.button} onPress={()=>this.props.navigation.navigate('ItemList')} title="Let's Go" color="#F6BD60"/>
      }

    return (
      <View style={styles.container}>
        <Image
            style={styles.logo}
            source = {require("../../imgs/logo.png")}
        />
        <Text style={styles.name}>breadcrumbs</Text>
        {next}
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
      fontSize: 50,
      color: "#333533",
      marginBottom: 100,
      fontFamily: "HiMelody-Regular"
  },
  button:{
      fontSize: 20,
      fontFamily:"WorkSans-Light"
  }
});
