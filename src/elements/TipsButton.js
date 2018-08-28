import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import designLanguage from '../../designLanguage.json';

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
    backgroundColor: designLanguage.colorPrimary,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: designLanguage.color900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 24,
  },
  button: {
    alignSelf: 'center',
    color: designLanguage.color50,
  },
});

export default TipsButton;
