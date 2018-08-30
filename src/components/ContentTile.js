import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Alert,
  Platform,
  AsyncStorage,
} from 'react-native';
import {
  Constants,
  FileSystem,
} from 'expo';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';

import designLanguage from '../../designLanguage.json';
import defaultMovie from '../../defaultMovie.json';
import DownloadButton from '../elements/DownloadButton.js';
import VideoTile from './VideoTile.js';

class ContentTile extends React.Component {
  state = {
    hasLocalDocument: false,
    localUri: null,
    isLoading: false,
  }

  componentDidMount() {
    this.fetchSession();
    this.checkLocalDocument();
  }

  // eslint-disable-next-line
  fetchSession = () => {
    const { video } = this.props;
    const { id } = video;
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        const currentVideoId = doc.data().currentVideo && doc.data().currentVideo.id;
        if (currentVideoId) {
          this.setState({ active: (currentVideoId === id) });
        } else {
          this.setState({ active: (defaultMovie.id === id) });
        }
      }
    });
  }

  checkLocalDocument = () => {
    const { video } = this.props;
    const youtubeId = video.data.youtubeData.id.videoId;
    // const path = `videos/withComment/${youtubeId}.mp4`;
    const localUri = `${FileSystem.documentDirectory}${youtubeId}.mp4`;
    FileSystem.getInfoAsync(localUri)
      .then(({ exists }) => {
        this.setState({ hasLocalDocument: exists, localUri });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }

  updateSession = (videoUrl, video) => {
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.set({
      currentVideoUrl: videoUrl,
      currentVideo: video,
    }, { merge: true });
  }

  setProgress = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    // eslint-disable-next-line
    console.log(progress);
    this.setState({
      downloadProgress: progress,
    });
  };

  resumeWriting = async () => {
    const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
    const downloadSnapshot = JSON.parse(downloadSnapshotJson);
    const downloadResumable = new FileSystem.DownloadResumable(
      downloadSnapshot.url,
      downloadSnapshot.fileUri,
      downloadSnapshot.options,
      this.setProgress,
      downloadSnapshot.resumeData,
    );

    try {
      const { uri } = await downloadResumable.resumeAsync();
      console.log('Finished downloading to ', uri);
    } catch (e) {
      console.error(e);
    }
  }

  pauseWriting = async () => {
    try {
      const { downloadResumable } = this.state;
      await downloadResumable.pauseAsync();
      console.log('Paused download operation, saving for future retrieval');
      AsyncStorage.setItem(
        'pausedDownload',
        JSON.stringify(downloadResumable.savable()),
      );
    } catch (e) {
      console.error(e);
    }
  }

  writeDocument = async (remoteUri) => {
    const downloadResumable = FileSystem.createDownloadResumable(
      remoteUri,
      this.state.localUri,
      {},
      this.setProgress,
    );

    this.setState({ downloadResumable });

    try {
      const { uri } = await downloadResumable.downloadAsync();
      // eslint-disable-next-line
      console.log('Finished downloading to ', uri);
      this.setState({ hasLocalDocument: true, isLoading: false });
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }

  getRemoteUri = (toDownload) => {
    const { video } = this.props;

    const storage = firebase.storage();
    const storageRef = storage.ref();
    const withoutCommentRef = storageRef.child(`video/withoutComment/${video.id}.mp4`);
    withoutCommentRef.getDownloadURL()
      .then((videoUrl) => {
        if (toDownload) {
          this.writeDocument(videoUrl);
        } else {
          this.updateSession(videoUrl, video);
        }
      })
      .catch(() => {
        const withCommentRef = storageRef.child(`video/withComment/${video.id}.mp4`);
        withCommentRef.getDownloadURL()
          .then((videoUrl) => {
            if (toDownload) {
              this.writeDocument(videoUrl);
            } else {
              this.updateSession(videoUrl, video);
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            Alert.alert('この動画は現在ダウンロードできません。');
          });
      });
  }

  deleteLocalVideo = async () => {
    FileSystem.deleteAsync(this.state.localUri)
      .then(() => {
        this.setState({ hasLocalDocument: false });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }

  confirmDelete = async () => {
    Alert.alert(
      '選択した動画をアプリから削除してもよろしいですか？',
      undefined,
      [
        // eslint-disable-next-line
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: this.deleteLocalVideo,
        },
      ],
      { cancelable: false },
    );
  }

  playLocalVideo = async () => {
    this.updateSession(this.state.localUri, this.props.video);
  }

  // eslint-disable-next-line
  onPressDownload = () => {
    if (this.state.hasLocalDocument) {
      this.confirmDelete();
    } else if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      const toDownload = true;
      this.getRemoteUri(toDownload);
    } else {
      this.pauseWriting();
    }
  }

  // eslint-disable-next-line
  onPressTile = () => {
    // this.view.bounce(800);
    if (this.state.hasLocalDocument) {
      this.playLocalVideo();
    } else if (!this.state.active) {
      const toDownload = false;
      this.getRemoteUri(toDownload);
    }
  }

  // handleViewtRef = ref => this.view = ref;

  render() {
    const {
      video,
      index,
    } = this.props;

    // const animation = index % 2 === 0 ? 'fadeInRightBig' : 'fadeInLeftBig';
    const animationAndroid = index % 2 === 0 ? 'zoomInLeft' : 'zoomInRight';
    const animationIOS = index % 2 === 0 ? 'flipInX' : 'flipInX';
    const delay = (index + 1) * 300;
    const isDefault = video.id === defaultMovie.id;

    const animation = Platform.OS === 'android' ? animationAndroid : animationIOS;

    return (
      <Animatable.View
        // ref={this.handleViewtRef}
        animation={animation}
        // animation="flipInX"
        iterationCount={1}
        direction="alternate"
        duration={1000}
        delay={delay}
        easing="ease"
      >
        <View
          style={[
            styles.container,
            // eslint-disable-next-line
            this.state.active && { backgroundColor: designLanguage.color700 },
          ]}
        >
          <VideoTile
            video={video}
            onPress={this.onPressTile}
            isLoading={this.state.isLoading}
            active={this.state.active}
            style={styles.videoTile}
          />
          <DownloadButton
            show={!isDefault}
            style={styles.downloadButton}
            onPress={this.onPressDownload}
            hasLocalDocument={this.state.hasLocalDocument}
            downloadProgress={this.state.downloadProgress}
            isLoading={this.state.isLoading}
            active={this.state.active}
          />
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
    flexDirection: 'row',
    // paddingRight: 4,
  },
  videoTile: {
    // flex: 6,
    width: '80%',
  },
  downloadButton: {
    flex: 1,
  },
});

export default ContentTile;
