import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';

import ContentTile from './ContentTile.js';

class Template extends React.Component {
  state = {}

  componentWillMount() {
    this.fetchVideos(this.props.category);
  }

  // eslint-disable-next-line
  fetchVideos = (category) => {
    const db = firebase.firestore();
    let videosRef;
    if (category === 'recent') {
      const maxResults = 10;
      videosRef = db.collection('videos').orderBy('publishedAt', 'desc').limit(maxResults);
    } else {
      videosRef = db.collection('videos').where('category', '==', category);
    }

    let videos = [];
    videosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        videos = this.shuffle(videos);
        this.setState({ videos });
      });
  }

  shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      // eslint-disable-next-line
      array[currentIndex] = array[randomIndex];
      // eslint-disable-next-line
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  updateSession = (videoUrl, video) => {
    AsyncStorage.setItem('currentId', video.id);
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.set({
      currentVideoUrl: videoUrl,
      currentVideo: video,
    });
  }

  onPressTitle = (video) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const withoutCommentRef = storageRef.child(`video/withoutComment/${video.id}.mp4`);
    withoutCommentRef.getDownloadURL()
      .then((videoUrl) => {
        this.updateSession(videoUrl, video);
      })
      .catch(() => {
        const withCommentRef = storageRef.child(`video/withComment/${video.id}.mp4`);
        withCommentRef.getDownloadURL()
          .then((videoUrl) => {
            this.updateSession(videoUrl, video);
          })
          .catch(() => {
            Alert.alert('この動画は現在アプリではみれません。');
          });
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <ContentTile
        onPress={() => this.onPressTitle(item)}
        thumbnailUrl={item.data.youtubeData.snippet.thumbnails.high.url}
        title={item.data.youtubeData.snippet.title}
        desc={item.data.youtubeData.snippet.description}
        player={item.data.tags.player}
        tags={item.data.tags.desc}
        index={index}
      />
    </View>
  )

  render() {
    if (!this.state.videos) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.videos}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            // extraData={this.state}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContainer: {
    marginTop: 10,
    // paddingBottom: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  item: {
    marginBottom: 4,
    // marginLeft: 20,
    // marginRight: 20,
  },
});

export default Template;
