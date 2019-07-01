/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Login from './src/screens/Login';
import Chats from './src/screens/Chats';
 
 const RootStack = createStackNavigator({
  Login: {screen:Login,
  navigationOptions:{
    header:null
  }
  },
  Chats: {screen:Chats,
    navigationOptions:{
      header:null
    }
  }
 },
 {
   initialRouteName: 'Login'
 }
 );
 const  AppContainer = createAppContainer(RootStack)

 export default class App extends Component{
   render(){
     return <AppContainer/>
   }
 }
 
 