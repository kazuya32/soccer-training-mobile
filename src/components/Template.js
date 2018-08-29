import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import ContentTile from './ContentTile.js';
import AdTile from '../elements/AdTile.js';

class Template extends React.Component {
  state = {
    showingVideos: null,
    loading: false,
    reloadNumber: 6,
  }

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
        this.addVideos();
      });
  }

  addVideos = () => {
    const { videos } = this.state;
    if (!this.state.loading && videos.length) {
      this.setState({ loading: true });

      let { showingVideos } = this.state;
      if (!showingVideos) {
        showingVideos = videos.slice(0, this.state.reloadNumber);
        videos.splice(0, this.state.reloadNumber);
      } else {
        const tmp = videos.slice(0, this.state.reloadNumber);
        videos.splice(0, this.state.reloadNumber);
        Array.prototype.push.apply(showingVideos, tmp);
      }
      this.setState({ showingVideos, videos, loading: false });
    }
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
    <View style={styles.tile}>
      <ContentTile
        video={item}
        index={index % this.state.reloadNumber}
      />
      <View style={(index + 1) % this.state.reloadNumber === 0 && styles.ad}>
        <AdTile
          show={(index + 1) % this.state.reloadNumber === 0}
        />
      </View>
    </View>
  )

  render() {
    if (!this.state.showingVideos) {
      return (
        <View style={[styles.indicator]}>
          <ActivityIndicator animating={!this.state.showingVideos} size="large" color={designLanguage.colorPrimary} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.showingVideos}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          // extraData={this.state}
          onEndReachedThreshold={0.1}
          onEndReached={this.addVideos}
        />
        <View style={[
            styles.activityIndicator,
            !this.state.loading && { display: 'none' },
          ]}
        >
          <ActivityIndicator size="small" color={designLanguage.colorPrimary} animating={this.state.loading} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designLanguage.color50,
    width: '100%',
    justifyContent: 'flex-start',
  },
  indicator: {
    flex: 1,
    backgroundColor: designLanguage.color50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    marginBottom: 8,
  },
  ad: {
    marginTop: 8,
  },
  activityIndicator: {
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Template;
