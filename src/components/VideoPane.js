import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Video,
  Constants,
} from 'expo';
import firebase from 'firebase';

class VideoPane extends React.Component {
  state = {
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/lifting-cb667.appspot.com/o/video%2FwithoutComment%2FYoutube%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB%E7%B4%B9%E4%BB%8B%E3%83%92%E3%82%99%E3%83%86%E3%82%99%E3%82%AA.mp4?alt=media&token=d307512f-92b3-463d-be8c-9e9c1d814bab',
  }

  componentDidMount() {
    this.fetchVideo();
  }

  fetchVideo = () => {
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        // eslint-disable-next-line
        console.log('doc exists');
        const videoId = doc.data().currentVideo.id;
        const videoUrl = doc.data().currentVideoUrl;
        AsyncStorage.setItem('currentId', videoId);
        this.setState({ videoUrl });
      } else {
        // eslint-disable-next-line
        console.log('doc doesnt exists');
      }
    });
  }

  render() {
    const {
      style,
    } = this.props;

    return (
      <Video
        source={{ uri: this.state.videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted
        resizeMode="cover"
        shouldPlay
        isLooping
        useNativeControls
        // shouldCorrectPitch
        style={style}
      />
    );
  }
}

export default VideoPane;
