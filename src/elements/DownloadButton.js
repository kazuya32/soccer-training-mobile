import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Pie } from 'react-native-progress';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DownloadButton extends React.Component {
  state = {
    isDownloading: false,
  }

  onPress = () => {
    if (!this.state.isDownloading) {
      this.setState({ isDownloading: true });
      this.props.onPress();
    }
  }
  render() {
    const {
      onPress,
      style,
      hasLocalDocument,
      isLoading,
      downloadProgress,
    } = this.props;

    const iconName = hasLocalDocument ? 'play-circle-outline' : 'download';
    const iconSize = hasLocalDocument ? 28 : 24;

    if (isLoading) {
      return (
        <View
          style={[styles.container, style]}
        >
          <Pie
            progress={downloadProgress}
            size={24}
            borderWidth={0}
            color="#1BBA53"
            style={{ alignSelf: 'center' }}
            endAngle={1}
          />
        </View>
      );
    }

    return (
      <TouchableHighlight
        onPress={onPress}
        style={[styles.container, style]}
        underlayColor="transparent"
      >
        <Icon
          name={iconName}
          size={iconSize}
          style={[
            styles.button,
            hasLocalDocument && { color: '#1BBA53' },
          ]}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default DownloadButton;
