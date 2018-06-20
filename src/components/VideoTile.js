import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  // Image,
  Dimensions,
} from 'react-native';

class VideoTile extends React.Component {
  render() {
    const {
      onPress,
      // thumbnailUrl,
      // title,
      // desc,
      player,
      tags,
      // index,
      tileStyle,
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={onPress} underlayColor="transparent">
          <View style={[styles.tile, tileStyle]}>
            <Text style={styles.skill}>
              {tags.join('の')}
            </Text>
            <Text style={styles.player}>
              {player.join(', ').replace('選手', '')}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

// <Image
//   style={styles.thumbnail}
//   source={{ uri: thumbnailUrl }}
//   resizeMode="cover"
// />

const styles = StyleSheet.create({
  container: {
  },
  tile: {
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#102330',
    borderColor: '#808080',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  thumbnail: {
    alignSelf: 'center',
    borderColor: '#808080',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').width * 0.2,
  },
  player: {
    color: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
  },
  skill: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default VideoTile;
