/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import React from 'react';


import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

import home from './home.js';
import list from './list.js';
import listdir from './content/ListDir.js'



const MyTab = TabNavigator({
    home: {
        screen: home,
        navigationOptions:({navigation,screenProps}) => ({

            // StackNavigator 属性部分

            // title:'Test1', 同步设置导航和tabbar文字,不推荐使用
            headerTitle:'辣条', // 只会设置导航栏文字,
            // header:{}, // 可以自定义导航条内容，如果需要隐藏可以设置为null
            // headerBackTitle:null, // 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
            // headerTruncatedBackTitle:'', // 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。
            // headerRight:{}, // 设置导航条右侧。可以是按钮或者其他。
            // headerLeft:{}, // 设置导航条左侧。可以是按钮或者其他。
            headerStyle:{
                backgroundColor:'#ea6f5a'
            }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
            headerTitleStyle:{
                fontSize:24,
                color:'white',
                alignSelf:'center'
            }, // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
            // headerBackTitleStyle:{}, // 设置导航条返回文字样式。
            // headerTintColor:'green', // 设置导航栏文字颜色。总感觉和上面重叠了。
            gesturesEnabled:true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭


            // TabNavigator 属性部分

            // title:'', 同上
            tabBarVisible:true, // 是否隐藏标签栏。默认不隐藏(true)
            //tabBarIcon: (({tintColor,focused}) => {
                //return(
//<Image
                      //  source={!focused ? ShiTuIcon : ShiTuIcon}
//style={[{height:35,width:35 }, {tintColor: tintColor}]}
                //    />
              //  )
          //  }), // 设置标签栏的图标。需要单独设置。
            tabBarLabel:'首页', // 设置标签栏的title。推荐这个方式。
        })
    },
    list: {
        screen:list,
        navigationOptions:({navigation,screenProps}) => ({

            // StackNavigator 属性部分

            // title:'Test1', 同步设置导航和tabbar文字,不推荐使用
            headerTitle:'辣条', // 只会设置导航栏文字,
            // header:{}, // 可以自定义导航条内容，如果需要隐藏可以设置为null
            // headerBackTitle:null, // 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
            // headerTruncatedBackTitle:'', // 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。
            // headerRight:{}, // 设置导航条右侧。可以是按钮或者其他。
            // headerLeft:{}, // 设置导航条左侧。可以是按钮或者其他。
            headerStyle:{
                backgroundColor:'#ea6f5a'
            }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
            headerTitleStyle:{
                fontSize:24,
                color:'white',
                alignSelf:'center'
            }, // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
            // headerBackTitleStyle:{}, // 设置导航条返回文字样式。
            // headerTintColor:'green', // 设置导航栏文字颜色。总感觉和上面重叠了。
            gesturesEnabled:true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭


            // TabNavigator 属性部分

            // title:'', 同上
            tabBarVisible:true, // 是否隐藏标签栏。默认不隐藏(true)
            //tabBarIcon: (({tintColor,focused}) => {
                //return(
//<Image
                      //  source={!focused ? ShiTuIcon : ShiTuIcon}
//style={[{height:35,width:35 }, {tintColor: tintColor}]}
                //    />
              //  )
          //  }), // 设置标签栏的图标。需要单独设置。
            tabBarLabel:'我的', // 设置标签栏的title。推荐这个方式。
        })
    },
},{
      //animationEnabled: false, // 切换页面时是否有动画效果
      tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
      swipeEnabled: false, // 是否可以左右滑动切换tab
      backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
      tabBarOptions: {
          activeTintColor: '#ff8500', // 文字和图片选中颜色
          inactiveTintColor: '#999', // 文字和图片未选中颜色
          //showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
          indicatorStyle: {
              height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          },
          style: {
              backgroundColor: '#eee', // TabBar 背景色
              //height: 44,
          },
          labelStyle: {
              fontSize: 16, // 文字大小
          },
      },

});


// 初始化StackNavigator
const MyNav = StackNavigator({
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    MyTab:{screen:MyTab},
    // 将需要跳转的页面注册在这里，全局才可以跳转
    list:{
        screen:list
    },
    listdir:{
        screen:listdir
    },

},{});



const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:22,color:'white',alignSelf:'center'};
    // header的style
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

export default MyNav;
