import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Linking,
  Alert,
} from 'react-native';

class UrlTile extends React.Component {
  state = {}

  onPress = (url) => {
    Linking.openURL(url).catch(err => Alert.alert('ページを開ませんでした。', err));
  }

  render() {
    const {
      title,
      url,
    } = this.props;

    return (
      <View style={styles.container} >
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        <View style={styles.tips}>
          <TouchableHighlight style={styles.container} onPress={() => this.onPress(url)} underlayColor="transparent">
            <Text style={styles.tipsItem}>
              {url}
            </Text>
          </TouchableHighlight>
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
    backgroundColor: '#102330',
  },
  tips: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 28,
    paddingRight: 28,
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tipsItem: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UrlTile;
