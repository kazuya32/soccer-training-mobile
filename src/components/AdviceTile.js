import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import designLanguage from '../../designLanguage.json';

class AdviceTile extends React.Component {
  state = {}

  render() {
    const {
      title,
      comment,
    } = this.props;

    if (!comment) { return null; }

    return (
      <View style={styles.container} >
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        <View style={styles.tips}>
          <Text style={styles.tipsItem}>
            {comment}
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
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: designLanguage.color900,
  },
  tips: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 28,
    paddingRight: 28,
  },
  titleText: {
    color: designLanguage.color50,
    fontSize: 18,
    fontWeight: '600',
  },
  tipsItem: {
    color: designLanguage.color900,
    fontSize: 18,
  },
});

export default AdviceTile;
