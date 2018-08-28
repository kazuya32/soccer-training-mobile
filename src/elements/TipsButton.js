import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

class TipsButton extends React.Component {
  render() {
    const {
      onPress,
      style,
      buttonEnabled,
      hasContent,
    } = this.props;

    if (!buttonEnabled) { return null; }

    const icon = hasContent ? <MaterialCommunityIcons name="lightbulb-on-outline" size={34} style={styles.button} />
      : <FontAwesome name="soccer-ball-o" size={34} style={styles.button} />;

    return (
      <TouchableHighlight onPress={onPress} style={[styles.container, style]} underlayColor="transparent">
        {icon}
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: designLanguage.colorPrimary,
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: designLanguage.color900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: 30,
  },
  button: {
    alignSelf: 'center',
    color: designLanguage.color50,
  },
});

export default TipsButton;
