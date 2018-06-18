import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Dimensions, Image } from 'react-native';
import firebase from 'firebase';

import VideoTile from './VideoTile.js';

class CategoryList extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.fetchVideos();
  }

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

    const videos = [];
    videosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          isLoading: false,
          videos,
        });
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;

    return (
      <View style={styles.item}>
        <VideoTile
          // tileStyle={{ backgroundColor: tileColor }}
          onPress={() => {
            navigation.navigate({
              routeName: 'VideoPlayer',
              params: item.data.youtubeData,
            });
          }}
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

    const { backgroundImage } = this.props;

    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          // source={this.state.backgroundImage}
          source={backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.videoContainer}>
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
  },
  bgImage: {
    opacity: 0.8,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  videoContainer: {
    marginTop: 10,
    // paddingBottom: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  item: {
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default CategoryList;
