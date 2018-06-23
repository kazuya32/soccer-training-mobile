import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class MovieButton extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableHighlight onPress={onPress} style={styles.container} underlayColor="transparent">
        <View style={styles.button} >
          <Icon name="movie" size={32} style={styles.icon} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 48,
    height: 48,
    zIndex: 100,
    backgroundColor: '#1BBA53',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#102330',
    shadowColor: '#102330',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 24,
  },
  button: {
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    color: 'black',
  },
});

export default MovieButton;
