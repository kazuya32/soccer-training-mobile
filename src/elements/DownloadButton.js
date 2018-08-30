import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Circle } from 'react-native-progress';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import designLanguage from '../../designLanguage.json';

class DownloadButton extends React.Component {
  formatText = () => {
    const {
      active,
      show,
      status,
    } = this.props;

    const iconName = status === 'loading' ? 'pause' : 'play';
    const generalColor = active ? designLanguage.color50 : designLanguage.colorPrimary;
    const digestColor = 'transparent';
    const fontColor = show ? generalColor : digestColor;


    return (
      <Icon
        name={iconName}
        size={24}
        style={[
          styles.button,
          { color: fontColor },
        ]}
      />
    );
  }

  render() {
    const {
      style,
      hasLocalDocument,
      status,
      downloadProgress,
      active,
      show,
    } = this.props;

    const onPress = show ? this.props.onPress : null;

    const generalColor = active ? designLanguage.color50 : designLanguage.colorPrimary;
    const digestColor = 'transparent';
    const fontColor = show ? generalColor : digestColor;
    const iconSize = 36;

    if (status === 'loading') {
      return (
        <TouchableHighlight
          onPress={onPress}
          style={[styles.container, style]}
          underlayColor="transparent"
        >
          <Circle
            progress={downloadProgress}
            formatText={this.formatText}
            showsText
            thickness={3}
            size={iconSize}
            borderWidth={0}
            color={fontColor}
            style={{ alignSelf: 'center' }}
            endAngle={1}
          />
        </TouchableHighlight>
      );
    }

    const downloadIcon = downloadProgress ? 'replay' : 'download';
    const iconName = hasLocalDocument ? 'checkbox-marked-circle-outline' : downloadIcon;

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
  pauseIcon: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default DownloadButton;
