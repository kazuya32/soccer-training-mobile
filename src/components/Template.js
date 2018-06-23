import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import firebase from 'firebase';

import ContentTile from './ContentTile.js';

class Template extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.fetchVideos();
  }
  // eslint-disable-next-line
  fetchVideos = () => {
    const db = firebase.firestore();
    let videosRef;

    const { category } = this.props;
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
        this.setState({
          isLoading: false,
          videos,
        });
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
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onPressButton = () => {
    Alert.alert('月の上限に達しました！');
  }

  onPressTile = () => {
    Alert.alert('表示する動画が変わります！');
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    // const isCurrent = {}
    return (
      <View style={styles.item}>
        <ContentTile
          // tileStyle={{ backgroundColor: tileColor }}
          // onPressTile={() => {
          //   navigation.navigate({
          //     routeName: 'VideoPlayer',
          //     params: item.data,
          //   });
          // }}
          onPress={this.onPressTile}
          onPressRightButton={this.onPressButton}
          thumbnailUrl={item.data.youtubeData.snippet.thumbnails.high.url}
          title={item.data.youtubeData.snippet.title}
          desc={item.data.youtubeData.snippet.description}
          player={item.data.tags.player}
          tags={item.data.tags.desc}
          index={index}
        />
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
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
