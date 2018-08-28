import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

class CloseButton extends React.Component {
  render() {
    const { onPress, buttonEnabled } = this.props;

    if (!buttonEnabled) { return null; }

    return (
      <TouchableHighlight onPress={onPress} style={styles.container} underlayColor="transparent">
        <View style={styles.button} >
          <Icon name="close" size={32} style={styles.icon} />
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    color: designLanguage.color50,
  },
});

export default CloseButton;
