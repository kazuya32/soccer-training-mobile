import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';

import AdTile from '../elements/AdTile.js';

class ContentTile extends React.Component {
  state = {}

  componentDidMount() {
    this.fetchSession();
  }

  fetchSession = () => {
    const { video } = this.props;
    const { title } = video.data.youtubeData.snippet;
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        const currentVideoId = doc.data().currentVideo && doc.data().currentVideo.id;
        this.setState({ active: (currentVideoId === title) });
      }
    });
  }

  render() {
    const {
      onPress,
      video,
      withAd,
    } = this.props;

    const thumbnailUrl = video.data.youtubeData.snippet.thumbnails.high.url;
    // const { title } = video.data.youtubeData.snippet;
    // const desc = video.data.youtubeData.snippet.description;
    const { player } = video.data.tags;
    const tags = video.data.tags.desc;

    return (
      <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
        <View>
          <View
            style={[styles.tile, withAd && { marginBottom: 4 }]}
          >
            <Image
              style={styles.thumbnail}
              source={{ uri: thumbnailUrl }}
              resizeMode="cover"
            />
            <View style={styles.caption}>
              <Text style={[styles.skill, this.state.active && styles.skillActive]}>
                {tags.join('の')}
              </Text>
              <Text style={styles.player}>
                {player.join(', ').replace('選手', '')}
              </Text>
            </View>
          </View>
          <AdTile
            show={withAd}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  tile: {
    flexDirection: 'row',
    // backgroundColor: '#102330',
    borderRadius: 8,
    borderColor: '#808080',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  thumbnail: {
    flex: 1,
  },
  caption: {
    padding: 8,
    flex: 2,
    justifyContent: 'center',
  },
  player: {
    color: 'gray',
  },
  skill: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
  },
  skillActive: {
    color: '#1BBA53',
  },
});

export default ContentTile;
