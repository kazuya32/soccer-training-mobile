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
} from 'expo';
import firebase from 'firebase';

class VideoPane extends React.Component {
  state = {
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/lifting-cb667.appspot.com/o/video%2FwithoutComment%2FYoutube%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB%E7%B4%B9%E4%BB%8B%E3%83%92%E3%82%99%E3%83%86%E3%82%99%E3%82%AA.mp4?alt=media&token=d307512f-92b3-463d-be8c-9e9c1d814bab',
    resizeMode: 'cover',
    loaded: false,
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
        if (videoUrl) {
          this.setState({ videoUrl, loaded: false });
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
  }

  render() {
    const {
      style,
    } = this.props;

    return (
      <View>
        <View
          style={[
            styles.indicator,
          ]}
        >
          <ActivityIndicator animating={!this.state.loaded} />
        </View>
        <Video
          // ref={ref => (this.video = ref)}
          // onReadyForDisplay={this.setDimensions}
          onLoad={this.onLoad}
          source={{ uri: this.state.videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode={this.state.resizeMode}
          shouldPlay
          positionMillis={0}
          isLooping
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
  indicator: {
    position: 'absolute',
    padding: 100,
    alignSelf: 'center',
  },
});

export default VideoPane;
