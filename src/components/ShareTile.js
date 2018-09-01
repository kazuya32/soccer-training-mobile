import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Share,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import designLanguage from '../../designLanguage.json';

class ShareTile extends React.Component {
  state = {}

  onPress = () => {
    const iosLink = 'https://itunes.apple.com/jp/app/soccer-hacker/id1427941988?l=en&mt=8';
    const androidLink = 'https://play.google.com/store/apps/details?id=com.lifting.android';
    const linkUrl = Platform.OS === 'android' ? androidLink : iosLink;
    const message = 'Soccer Hackerで実践に役立つサッカースキルを身につけよう！' + linkUrl;
    const content = {
      title: 'Soccer Hacker',
      message,
    };
    Share.share(content);
  }

  render() {
    const {
      title,
      show,
    } = this.props;

    if (!show) { return null; }

    return (
      <View style={styles.container} >
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        <View style={styles.share}>
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="transparent">
            <View style={styles.item}>
              <Icon
                name="share"
                size={36}
                style={[
                  { color: designLanguage.color700 },
                ]}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: designLanguage.color900,
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
  share: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleText: {
    color: designLanguage.color50,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ShareTile;
