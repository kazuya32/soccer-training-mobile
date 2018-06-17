import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Alert, Dimensions, Image } from 'react-native';
import firebase from 'firebase';

import ENV from '../../env.json';
import VideoTile from '../components/VideoTile.js';
import BackgroundImage from '../../assets/bgImage/image4.jpg';

class Recent extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = () => {
    const db = firebase.firestore();
    const maxResults = 10;
    const videosRef = db.collection(`videos`).orderBy('publishedAt', 'desc').limit(maxResults);

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

  onPressTest() {
    Alert.alert('Test!');
  }

  // for collecting data
  youtubeIndexer() {
    const db = firebase.firestore();

    const channelId = 'UCa22yvSVK7nu-O7PrzTuafA';
    const key = ENV.GCP_API_KEY;
    const maxResults = 50;
    const pageToken = '';

    const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${key}&maxResults=${maxResults}&channelId=${channelId}&part=snippet&type=video&pageToken=${pageToken}`;

    return fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {

        response.items.forEach((item) => {
          const title = item.snippet.title;
          const tags = title.split('の')
          const playerTag = [ tags[0] ] ;
          tags.shift();
          tagObject = { player: playerTag, desc: tags }

          data = {
            youtubeData: item,
            tags: tagObject,
            publishedAt: item.snippet.publishedAt,
          }

          db.collection("videos").doc(title).set(data)
            .then(function() {
                console.log(title);
            });

        });

        console.log(response.nextPageToken);

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item, index }) {
    return (
      <View style={styles.item}>
        <VideoTile
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'VideoPlayer',
              params: item.data.youtubeData,
              // params: { videoId: item.data.youtubeData.id.videoId },
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
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          // source={this.state.backgroundImage}
          source={BackgroundImage}
          resizeMode="cover"
        />
        <View>
          <FlatList
            data={this.state.videos}
            renderItem={this.renderItem.bind(this)}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    paddingBottom: 10,
  },
  bgImage: {
    opacity: 0.8,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  item: {
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Recent;
