import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  Video,
  Constants,
  Segment,
} from 'expo';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import defaultMovie from '../../defaultMovie.json';

class VideoPane extends React.Component {
  state = {
    videoUrl: this.props.defaultUri,
    resizeMode: 'cover',
    loaded: false,
    isDefault: true,
    rate: 1.0,
  }

  componentWillMount() {
    Dimensions.addEventListener('change', this.setDimensions);
  }

  componentDidMount() {
    this.setDimensions();
    this.fetchVideo();
  }

  setDimensions = () => {
    const { height, width } = Dimensions.get('window');
    if (height < width) {
      this.setState({ height, width, resizeMode: 'contain' });
      // this.video.presentFullscreenPlayer();
    } else {
      this.setState({ height: width * 0.56, width, resizeMode: 'cover' });
      // this.video.dismissFullscreenPlayer();
    }
    this.updateButtonEnabled(height > width);
  }

  fetchVideo = () => {
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        // eslint-disable-next-line
        console.log('doc exists');
        // const videoId = doc.data().currentVideo.id;
        const videoUrl = doc.data().currentVideoUrl;
        const currentVideoId = doc.data().currentVideo && doc.data().currentVideo.id;
        const rate = doc.data().rate || 1.0;

        if (videoUrl && (videoUrl !== this.state.videoUrl)) {
          // const event = 'Video Selected';
          const videoTitle = currentVideoId;
          const event = videoTitle;
          // const properties = { category: videoTitle, label: videoTitle, value: videoTitle };
          const properties = { category: 'video', label: 'selected', value: videoTitle, rate };
          Segment.trackWithProperties(event, properties);

          this.setState({
            videoUrl,
            loaded: false,
            isDefault: defaultMovie.id === currentVideoId,
            rate,
            realRate: rate,
          });
        } else if (rate !== this.state.realRate) {
          this.playback.setRateAsync(rate, false);
          // real rateのみを更新するようにしないとvideo componentに再更新がはしる
          this.setState({ realRate: rate });
        }
      } else {
        // eslint-disable-next-line
        console.log('doc doesnt exists');
      }
    });
  }

  updateButtonEnabled = (buttonEnabled) => {
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.set({ buttonEnabled }, { merge: true });
  }

  // eslint-disable-next-line
  onLoad = () => {
    this.setState({ loaded: true });
    this.playback.setPositionAsync(0);
    this.playback.playAsync();
  }

  onPlaybackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded && playbackStatus.error) {
      // eslint-disable-next-line
      console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
    } else if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      this.playback.stopAsync();
    }
  };

  handleVideoRef = (component) => {
    this.playback = component;
  }

  render() {
    const {
      style,
    } = this.props;

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.indicator,
          ]}
        >
          <ActivityIndicator animating={!this.state.loaded} size="large" color={designLanguage.colorPrimary} />
        </View>
        <Video
          ref={this.handleVideoRef}
          onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
          onLoad={this.onLoad}
          source={{ uri: this.state.videoUrl }}
          rate={this.state.rate}
          volume={1.0}
          isMuted
          resizeMode="contain"
          // resizeMode={this.state.resizeMode}
          shouldPlay
          positionMillis={0}
          isLooping={this.state.isDefault}
          useNativeControls
          // shouldCorrectPitch
          style={[
            styles.video,
            { height: this.state.height, width: this.state.width },
            style,
          ]}
          // usePoster
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: designLanguage.color50,
  },
  indicator: {
    position: 'absolute',
    padding: 100,
    alignSelf: 'center',
  },
  video: {
    backgroundColor: '#000000',
  },
});

export default VideoPane;
