import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class list extends Component {
  static navigationOptions = ({navigation}) => ({
      title: '辣条',
      titleStyle: {color: '#ff00ff'},
      headerStyle:{backgroundColor:'#000000'}
  });

  constructor(props){
    super(props);

  }

  gotoPage(){
    const {navigate} = this.props.navigation;
    navigate('Page',{
      user:'Page'
    });
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#888888'}}>
        <Text>Home</Text>

        <View style={{width:100,height:40,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'#fff'}} onPress={()=>{this.gotoPage()}}>点击跳转</Text>
        </View>
      </View>
    );
  }
}
