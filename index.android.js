import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './pages/App.js';

export default class Latiao extends Component {
  render() {
    return (
     <App />
    );
  }
}

AppRegistry.registerComponent('Latiao', () => Latiao);
