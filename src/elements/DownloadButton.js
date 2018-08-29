import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Pie } from 'react-native-progress';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import designLanguage from '../../designLanguage.json';

class DownloadButton extends React.Component {
  render() {
    const {
      style,
      hasLocalDocument,
      isLoading,
      downloadProgress,
      active,
      show,
    } = this.props;

    const onPress = show ? this.props.onPress : null;

    const iconName = hasLocalDocument ? 'checkbox-marked-circle-outline' : 'download';
    const iconSize = 28;
    const generalColor = active ? designLanguage.color50 : designLanguage.colorPrimary;
    const digestColor = 'transparent';
    const fontColor = show ? generalColor : digestColor;

    if (isLoading) {
      return (
        <View
          style={[styles.container, style]}
        >
          <Pie
            progress={downloadProgress}
            size={24}
            borderWidth={2}
            color={fontColor}
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
            { color: fontColor },
            // hasLocalDocument && { color: designLanguage.colorPrimary },
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
    textAlign: 'center',
  },
});

export default DownloadButton;
