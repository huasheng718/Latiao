import React, {
    Component,
} from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator,TabNavigator,TabBarBottom } from 'react-navigation';

import home from './pages/home.js';
import list from './pages/list.js';


const Latiao = TabNavigator({
    Home: { screen: home,navigationOptions:{
              tabBarLabel:'首页'
            }},
    List: {screen:list,navigationOptions:{
        tabBarLabel:'我的'
      }},
},
{
tabBarComponent:TabBarBottom,
tabBarPosition:'bottom',
swipeEnabled:false,
lazy:true,
tabBarOptions:{
 activeTintColor:'#06c1ae',
 inactiveTintColor:'#979797',
 style:{backgroundColor:'#ffffff',},
 labelStyle: {
       fontSize: 20, // 文字大小
   },
}
});

AppRegistry.registerComponent('Latiao', () => Latiao);
