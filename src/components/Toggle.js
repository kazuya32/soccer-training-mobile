import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

class ShareTile extends React.Component {
  state = {}

  onPress = () => {
  }

  render() {
    const {
      title,
      show,
      leftText,
      rightText,
      value,
      onValueChange,
    } = this.props;

    if (!show) { return null; }

    return (
      <View style={styles.container} >
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        <View style={styles.toggle}>

          <Text style={styles.toggleText}>
            {leftText}
          </Text>
          <View style={styles.item}>
            <Switch
              onValueChange={onValueChange}
              value={value}
              thumbTintColor={designLanguage.color700}
              tintColor={designLanguage.color100}
            />
          </View>
          <Text style={styles.toggleText}>
            {rightText}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: designLanguage.color900,
  },
  titleText: {
    color: designLanguage.color50,
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    borderRadius: 16,
    width: 48,
    height: 48,
    // backgroundColor: designLanguage.color900,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: designLanguage.color900,
    padding: 4,
  },
  toggle: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ShareTile;
