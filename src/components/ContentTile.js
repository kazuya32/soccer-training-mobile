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

class ContentTile extends React.Component {
  state = {}

  componentDidMount() {
    this.fetchSession();
  }

  fetchSession = () => {
    const { title } = this.props;
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
      thumbnailUrl,
      title,
      // desc,
      player,
      tags,
      // index,
    } = this.props;

    return (
      <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
        <View style={styles.tile}>
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
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    // paddingLeft: 8,
    // paddingRight: 8,
  },
  skill: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    // paddingLeft: 8,
    // paddingRight: 8,
  },
  skillActive: {
    color: '#1BBA53',
  },
});

export default ContentTile;
