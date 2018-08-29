import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
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

        if (category === 'recent') {
          const digestVideo = videos[0];
          videos.shift();
          videos = this.shuffle(videos);
          videos.unshift(digestVideo);
        }
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

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ContentTile
      video={item}
      withAd={index !== 0 && index % 6 === 0}
    />
  )

  render() {
    if (!this.state.videos) {
      return (
        <View style={[styles.indicator]}>
          <ActivityIndicator animating={!this.state.loaded} size="large" color={designLanguage.colorPrimary} />
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
    backgroundColor: designLanguage.color50,
  },
  indicator: {
    flex: 1,
    backgroundColor: designLanguage.color50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
});

export default Template;
