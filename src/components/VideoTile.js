import React from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native';
import { FileSystem } from 'expo';

import designLanguage from '../../designLanguage.json';

class VideoTile extends React.Component {
  state = {}

  componentDidMount() {
    this.cacheImage();
  }
  // eslint-disable-next-line
  cacheImage = async () => {
    const { video } = this.props;
    const youtubeId = video.data.youtubeData.id.videoId;
    const thumbnailUrl = video.data.youtubeData.snippet.thumbnails.high.url;

    const ext = await this.getFileExtension(thumbnailUrl);
    const path = FileSystem.cacheDirectory + 'thumbnail' + youtubeId + '.' + ext;
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) {
      await FileSystem.downloadAsync(thumbnailUrl, path);
    }
    this.setState({ uri: path });
  };

  getFileExtension = async filename => filename.split('.').pop().split('?').shift();

  render() {
    const {
      active,
      onPress,
      video,
    } = this.props;


    // const { title } = video.data.youtubeData.snippet;
    // const desc = video.data.youtubeData.snippet.description;
    const { player } = video.data.tags;
    const tags = video.data.tags.desc;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        style={[styles.container]}
      >
        <View
          style={[styles.tile]}
        >
          <Image
            style={styles.thumbnail}
            source={{ uri: this.state.uri }}
            resizeMode="cover"
          />
          <View style={[styles.caption]}>
            <Text style={[styles.skill, active && styles.skillActive]}>
              {tags.join('の')}
            </Text>
            <Text style={[styles.player, active && styles.playerActive]}>
              {player.join(', ').replace('選手', '')}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile: {
    flexDirection: 'row',
  },
  thumbnail: {
    flex: 1,
  },
  caption: {
    flex: 2,
    padding: 8,
    justifyContent: 'center',
  },
  player: {
    color: designLanguage.color800,
  },
  playerActive: {
    color: designLanguage.color100,
  },
  skill: {
    color: designLanguage.color900,
    fontWeight: '500',
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  skillActive: {
    color: designLanguage.color50,
  },
});

export default VideoTile;
