import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Alert, Dimensions, Image } from 'react-native';

import ENV from '../../env.json';
import VideoTile from '../components/VideoTile.js';
import BackgroundImage from '../../assets/bgImage/image4.jpg';

class Home extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    const channelId = 'UCa22yvSVK7nu-O7PrzTuafA';
    const key = ENV.GCP_API_KEY;
    const maxResults = 7;

    const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${key}&maxResults=${maxResults}&channelId=${channelId}&part=snippet`
    return fetch(endpoint)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          videos: responseJson.items,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  onPressTest() {
    Alert.alert('Test!');
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item, index }) {
    return (
      <VideoTile
        // onPress={() => {
        //   this.props.navigation.navigate({
        //     routeName: 'Home',
        //   });
        // }}
        onPress={this.onPressTest}
        thumbnailUrl={item.snippet.thumbnails.high.url}
        title={item.snippet.title}
        desc={item.snippet.description}
        index={index}
      />
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
        <View style={styles.videoList}>
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
  },
  bgImage: {
    opacity: 0.8,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
});

export default Home;
