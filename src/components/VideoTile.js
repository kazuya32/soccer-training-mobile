import React from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native';

import designLanguage from '../../designLanguage.json';

class VideoTile extends React.Component {
  render() {
    const {
      active,
      onPress,
      video,
    } = this.props;

    const thumbnailUrl = video.data.youtubeData.snippet.thumbnails.high.url;
    // const { title } = video.data.youtubeData.snippet;
    // const desc = video.data.youtubeData.snippet.description;
    const { player } = video.data.tags;
    const tags = video.data.tags.desc;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
      >
        <View
          style={[styles.tile]}
        >
          <Image
            style={styles.thumbnail}
            source={{ uri: thumbnailUrl }}
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
  tile: {
    flexDirection: 'row',
  },
  thumbnail: {
    flex: 2,
  },
  caption: {
    flex: 4,
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
