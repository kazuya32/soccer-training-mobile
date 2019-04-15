import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Platform,
  AsyncStorage,
  // PermissionsAndroid,
} from 'react-native';
import {
  Constants,
  FileSystem,
  // Permissions,
} from 'expo';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
// import RNFS from 'react-native-fs';

import designLanguage from '../../designLanguage.json';
import defaultMovie from '../../defaultMovie.json';
import DownloadButton from '../elements/DownloadButton.js';
import VideoTile from './VideoTile.js';

class ContentTile extends React.Component {
  state = {
    hasLocalDocument: false,
    localUri: null,
    status: null,
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
    // console.log(progress);
    this.setState({
      downloadProgress: progress,
    });
  };

  resume = async () => {
    try {
      const { video } = this.props;
      const youtubeId = video.data.youtubeData.id.videoId;

      const downloadJson = await AsyncStorage.getItem(`pausedDownload${youtubeId}`);
      if (downloadJson !== null) {
        const downloadFromStore = JSON.parse(downloadJson);
        this.download = new FileSystem.DownloadResumable(
          downloadFromStore.url,
          downloadFromStore.fileUri,
          downloadFromStore.options,
          this.setProgress,
          downloadFromStore.resumeData,
        );
        await this.download.resumeAsync();
        if (this.state.downloadProgress === 1) {
          this.setState({ hasLocalDocument: true, status: null });
        }
      } else {
        return;
      }
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  };

  pause = async () => {
    try {
      const { video } = this.props;
      const youtubeId = video.data.youtubeData.id.videoId;

      const downloadSnapshot = await this.download.pauseAsync();
      // eslint-disable-next-line
      console.log('Paused download operation, saving for future retrieval');
      await AsyncStorage.setItem(`pausedDownload${youtubeId}`, JSON.stringify(downloadSnapshot));
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }

  downloadVideoAndroid = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status === 'granted') {
    //   // this.downloadSDCard();
    // }
    // console.log(RNFS.ExternalStorageDirectoryPath);
    this.downloadVideo();
  }

  // downloadSDCard = async () => {
  //   FileSystem.getInfoAsync('file:///sdcard/')
  //     .then(({ exists }) => {
  //       console.log('exists', exists);
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line
  //       console.log(error);
  //     });
  //   // try {
  //   //   const remoteUri = await this.getRemoteUri();
  //   //   if (remoteUri) {
  //   //     this.download = FileSystem.createDownloadResumable(
  //   //       remoteUri,
  //   //       'file:///sdcard/soccerhacker/sample.mp4',
  //   //       {},
  //   //       this.setProgress,
  //   //     );
  //   //
  //   //     await this.download.downloadAsync();
  //   //     // eslint-disable-next-line
  //   //     if (this.state.downloadProgress === 1){
  //   //       this.setState({ hasLocalDocument: true, status: null });
  //   //     }
  //   //   } else {
  //   //     Alert.alert('この動画は現在利用できません。');
  //   //     this.setState({ status: null });
  //   //   }
  //   // } catch (e) {
  //   //   // eslint-disable-next-line
  //   //   console.error(e);
  //   // }
  // }

  downloadVideo = async () => {
    try {
      const remoteUri = await this.getRemoteUri();
      if (remoteUri) {
        this.download = FileSystem.createDownloadResumable(
          remoteUri,
          this.state.localUri,
          {},
          this.setProgress,
        );

        await this.download.downloadAsync();
        // eslint-disable-next-line
        if (this.state.downloadProgress === 1){
          this.setState({ hasLocalDocument: true, status: null });
        }
      } else {
        Alert.alert('この動画は現在利用できません。');
        this.setState({ status: null });
      }
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }

  getRemoteUri = () => {
    const { video } = this.props;
    if (video.id === 'セルヒオ・ブスケツの引き技からの縦突破と裏へ抜けるサイドチェンジのキック') {
      const videoUrl = 'https://firebasestorage.googleapis.com/v0/b/lifting-cb667.appspot.com/o/video%2FwithoutComment%2F%E3%82%BB%E3%83%AB%E3%83%92%E3%82%AA%E3%83%BB%E3%83%95%E3%82%99%E3%82%B9%E3%82%B1%E3%83%84%E3%81%AE%E5%BC%95%E3%81%8D%E6%8A%80%E3%81%8B%E3%82%89%E3%81%AE%E7%B8%A6%E7%AA%81%E7%A0%B4%E3%81%A8%E8%A3%8F%E3%81%B8%E6%8A%9C%E3%81%91%E3%82%8B%E3%82%B5%E3%82%A4%E3%83%88%E3%82%99%E3%83%81%E3%82%A7%E3%83%B3%E3%82%B7%E3%82%99%E3%81%AE%E3%82%AD%E3%83%83%E3%82%AF.mp4?alt=media&token=8e6bc1c9-e5aa-42a2-96ac-ea210f7c6f8a';
      return videoUrl;
    }

    const storage = firebase.storage();
    const storageRef = storage.ref();
    const withoutCommentRef = storageRef.child(`video/withoutComment/${video.id}.mp4`);
    // const remoteUri = await withoutCommentRef.getDownloadURL();
    return withoutCommentRef.getDownloadURL()
      .catch(() => {
        const withCommentRef = storageRef.child(`video/withComment/${video.id}.mp4`);
        withCommentRef.getDownloadURL()
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      });
  }

  deleteLocalVideo = async () => {
    FileSystem.deleteAsync(this.state.localUri)
      .then(() => {
        this.setState({ hasLocalDocument: false, status: null, downloadProgress: 0 });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }

  confirmDelete = async () => {
    if (this.state.active) {
      Alert.alert('保存した動画を再生中に削除することはできません。');
    } else {
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
  }

  playLocalVideo = async () => {
    this.updateSession(this.state.localUri, this.props.video);
  }

  playRemoteVideo = async () => {
    try {
      const remoteUri = await this.getRemoteUri();
      if (remoteUri) {
        this.updateSession(remoteUri, this.props.video);
      } else {
        Alert.alert('この動画は現在利用できません。');
      }
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }

  // eslint-disable-next-line
  onPressDownload = () => {
    if (this.state.hasLocalDocument) {
      this.confirmDelete();
    } else if (!this.state.status) {
      this.setState({ status: 'loading' });
      if (Platform.OS === 'android') {
        this.downloadVideoAndroid();
      } else {
        this.downloadVideo();
      }
    } else if (this.state.status === 'loading') {
      this.setState({ status: 'paused' });
      // eslint-disable-next-line
      console.log('pause');
      this.pause();
    } else if (this.state.status === 'paused') {
      this.setState({ status: 'loading' });
      // eslint-disable-next-line
      console.log('resume');
      this.resume();
    }
  }

  // eslint-disable-next-line
  onPressTile = () => {
    if (this.state.hasLocalDocument) {
      this.playLocalVideo();
    } else if (!this.state.active) {
      this.playRemoteVideo();
      console.log(this.props.video.id);
    }
  }

  // handleViewtRef = ref => this.view = ref;

  render() {
    const {
      video,
      // index,
    } = this.props;

    const isDefault = video.id === defaultMovie.id;

    const isAndroid = Platform.OS === 'android';

    const animationAndroid = 'fadeIn';
    const animationIOS = 'fadeIn';
    const animation = isAndroid ? animationAndroid : animationIOS;

    // const delayTime = isAndroid ? 400 : 300;
    // const delay = (index + 1) * delayTime;
    const delay = 0;
    const ease = isAndroid ? 'ease' : 'ease';

    const body = (
      <View
        style={[
          styles.container,
          this.state.active && { backgroundColor: designLanguage.color700 },
        ]}
      >
        <VideoTile
          video={video}
          onPress={this.onPressTile}
          active={this.state.active}
          style={styles.videoTile}
        />
        <DownloadButton
          show={!isDefault}
          style={styles.downloadButton}
          onPress={this.onPressDownload}
          hasLocalDocument={this.state.hasLocalDocument}
          downloadProgress={this.state.downloadProgress}
          status={this.state.status}
          active={this.state.active}
        />
      </View>
    );

    if (isAndroid) {
      return body;
    }

    return (
      <Animatable.View
        // ref={this.handleViewtRef}
        animation={animation}
        iterationCount={1}
        direction="alternate"
        duration={1000}
        delay={delay}
        easing={ease}
      >
        {body}
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 4,
    flexDirection: 'row',
  },
  videoTile: {
    flex: 1,
  },
  downloadButton: {
    paddingRight: 12,
  },
});

export default ContentTile;
