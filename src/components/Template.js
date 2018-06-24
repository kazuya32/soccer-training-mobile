import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';

import ContentTile from './ContentTile.js';

class Template extends React.Component {
  state = {}

  componentWillMount() {
    this.fetchVideos();
  }

  fetchVideos = () => {
    const { videos } = this.props;
    this.setState({
      videos,
    });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    const { onPress } = this.props;
    return (
      <View style={styles.item}>
        <ContentTile
          onPress={() => onPress(item)}
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
