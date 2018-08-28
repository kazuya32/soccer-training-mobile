import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  Constants,
  FileSystem,
} from 'expo';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import AdTile from '../elements/AdTile.js';
import DownloadButton from '../elements/DownloadButton.js';

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
    const { title } = video.data.youtubeData.snippet;
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        const currentVideoId = doc.data().currentVideo && doc.data().currentVideo.id;
        this.setState({ active: (currentVideoId === title) });
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
    AsyncStorage.setItem('currentId', video.id);

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

  writeDocument = async (remoteUri) => {
    const downloadResumable = FileSystem.createDownloadResumable(
      remoteUri,
      this.state.localUri,
      {},
      this.setProgress,
    );

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

  playLocalVideo = async () => {
    this.updateSession(this.state.localUri, this.props.video);
  }

  // eslint-disable-next-line
  onPressLocal = () => {
    if (this.state.hasLocalDocument) {
      this.playLocalVideo();
    } else if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      const toDownload = true;
      this.getRemoteUri(toDownload);
    }
  }

  // eslint-disable-next-line
  onPressContainer = () => {
    if (this.state.hasLocalDocument) {
      this.playLocalVideo();
    } else if (!this.state.active) {
      const toDownload = false;
      this.getRemoteUri(toDownload);
    }
  }

  render() {
    const {
      video,
      withAd,
    } = this.props;

    const thumbnailUrl = video.data.youtubeData.snippet.thumbnails.high.url;
    // const { title } = video.data.youtubeData.snippet;
    // const desc = video.data.youtubeData.snippet.description;
    const { player } = video.data.tags;
    const tags = video.data.tags.desc;

    return (
      <TouchableHighlight style={[styles.container, this.state.active && { backgroundColor: designLanguage.color700 }]} onPress={this.onPressContainer} underlayColor="transparent">
        <View>
          <View
            style={[styles.tile, withAd && { marginBottom: 4 }]}
          >
            <Image
              style={styles.thumbnail}
              source={{ uri: thumbnailUrl }}
              resizeMode="cover"
            />
            <View style={styles.caption}>
              <Text style={[styles.skill, this.state.active && styles.skillActive]}>
                {tags.join('の')}
              </Text>
              <Text style={[styles.player, this.state.active && styles.playerActive]}>
                {player.join(', ').replace('選手', '')}
              </Text>
            </View>
            <DownloadButton
              style={styles.downloadButton}
              onPress={this.onPressLocal}
              hasLocalDocument={this.state.hasLocalDocument}
              downloadProgress={this.state.downloadProgress}
              isLoading={this.state.isLoading}
              active={this.state.active}
            />
          </View>
          <AdTile
            show={withAd}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingLeft: 4,
    // paddingRight: 4,
  },
  tile: {
    flexDirection: 'row',
  },
  thumbnail: {
    flex: 2,
  },
  caption: {
    flex: 4,
    padding: 8,
    justifyContent: 'center',
  },
  player: {
    color: designLanguage.color800,
  },
  playerActive: {
    color: designLanguage.color100,
  },
  skill: {
    color: designLanguage.color900,
    fontWeight: '500',
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  skillActive: {
    color: designLanguage.color50,
  },
  downloadButton: {
    flex:1,
  },
});

export default ContentTile;
