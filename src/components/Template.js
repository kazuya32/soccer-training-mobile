import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Dimensions, Image, Alert } from 'react-native';
import firebase from 'firebase';
import { Video } from 'expo';

import ContentTile from './ContentTile.js';
import BackgroundImage from '../../assets/bgImage/image4.jpg';

class Template extends React.Component {
  state = {
    isLoading: true,
    videoUrl: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
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
    // const { navigation } = this.props;

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
          onPressTile={this.onPressTile}
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

    // const { backgroundImage } = this.props;
    const backgroundImage = BackgroundImage;

    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={backgroundImage}
          resizeMode="cover"
        />
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
          style={styles.videoPlayer}
        />
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
    backgroundColor: '#fff',
  },
  bgImage: {
    opacity: 0.8,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
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
  videoPlayer: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },
});

export default Template;
