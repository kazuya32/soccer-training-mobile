import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  WebView,
} from 'react-native';

class VideoPlayer extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params;
    const source = `https://www.youtube.com/embed/${id.videoId}?rel=0&autoplay=0&showinfo=0&controls=0`;

    return (
      <View style={styles.container}>
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
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: 70,
  },
  videoPlayer: {
    width: '100%',
    // height: '50%',
    height: 200,
  },
});

export default VideoPlayer;
