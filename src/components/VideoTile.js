import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';

class VideoTile extends React.Component {
  render() {
    const {
      onPress,
      thumbnailUrl,
      title,
      desc,
      index,
    } = this.props;

    const caption = `${index} ${title}`

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={onPress} underlayColor="transparent">
          <View style={styles.tile}>

            <Text style={styles.caption}>
              {title}
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
    paddingTop: 20,
    // width: Dimensions.get('window').width,

  },
  tile: {
    justifyContent: 'center',
    padding: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: '#0787C3',
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
  caption: {
    color: '#fff',
  },
});

export default VideoTile;
