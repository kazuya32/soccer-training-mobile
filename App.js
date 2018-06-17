import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Home from './src/screens/Home.js';

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
