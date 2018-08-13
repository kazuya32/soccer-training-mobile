import React from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Text,
} from 'react-native';

import VideoBar from '../components/VideoBar.js';

class VideoPlayer extends React.Component {
  render() {
    const { tags, youtubeData } = this.props.navigation.state.params;
    const { id } = youtubeData;
    const source = `https://www.youtube.com/embed/${id.videoId}?rel=0&autoplay=1&showinfo=0&controls=0&loop=1`;

    return (
      <View style={styles.container}>
        <VideoBar
          onPressLeft={() => { this.props.navigation.goBack(); }}
        />
        <View style={styles.desc}>
          <Text style={styles.skill}>
            {tags.desc.join('の')}
          </Text>
          <Text style={styles.player}>
            {tags.player.join(', ').replace('選手', '')}
          </Text>
        </View>
        <WebView
          style={styles.videoPlayer}
          javaScriptEnabled
          source={{ uri: source }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102330',
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  desc: {
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    width: '90%',
    backgroundColor: '#fff',
    // width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  player: {
    color: '#102330',
  },
  skill: {
    color: '#102330',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: 'pink',
  },
  videoPlayer: {
    // flex: 1,
    // marginBottom: Dimensions.get('window').height * 0.2,
    width: '100%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
});

export default VideoPlayer;
