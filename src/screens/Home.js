import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Video } from 'expo';
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';

import List from '../components/List.js';
import Detail from '../components/Detail.js';

const Stack = createStackNavigator({
  List: { screen: List },
  Detail: { screen: Detail },
}, {
  headerMode: 'none',
});

class Home extends React.Component {
  state = {
    title: 'イニエスタのダブルタッチ.mp4',
    currentItem: null,
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = () => {
    const storage = firebase.storage();
    var storageRef = storage.ref();
    var spaceRef = storageRef.child(`video/withoutComment/${this.state.title}`);
    spaceRef.getDownloadURL()
      .then((url) => {
        this.setState({
          videoUrl: url,
        });
      });
  }

  // onPress = (item) => {
  //   this.setState({ currentItem: item });
  // }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: this.state.videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode="cover"
          shouldPlay
          isLooping
          useNativeControls
          // shouldCorrectPitch
          style={styles.videoPlayer}
        />
        <Stack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoPlayer: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    zIndex: 50,
  },
});

export default Home;
