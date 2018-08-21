import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class TipsButton extends React.Component {
  render() {
    const { onPress, style, buttonEnabled } = this.props;

    if (!buttonEnabled) { return null; }

    return (
      <TouchableHighlight onPress={onPress} style={[styles.container, style]} underlayColor="transparent">
        <Icon name="soccer-ball-o" size={34} style={styles.button} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
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
    color: 'black',
  },
});

export default TipsButton;
