import React from 'react';
import { StyleSheet, View } from 'react-native';

import CancelButton from '../elements/CancelButton.js';

class VideoBar extends React.Component {
  render() {
    const {
      onPressLeft,
      // onPressRight,
      // headerTitle,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <CancelButton onPress={onPressLeft} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#102330',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 10,
  },
  button: {
    paddingLeft: 14,
    paddingRight: 14,
    alignSelf: 'center',
  },
});

export default VideoBar;
