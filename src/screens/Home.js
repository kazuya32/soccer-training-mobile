import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import ENV from '../../env.json';

class Home extends React.Component {
  state = {
    isLoading: true,
    videos: [
      { snippet: { title: 'video 1' } },
      { snippet: { title: 'video 2' } },
      { snippet: { title: 'video 3' } },
    ],
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

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <Text>
        { item.snippet.title }
      </Text>
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
  },
});

export default Home;
