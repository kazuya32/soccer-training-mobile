import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Video } from 'expo';
import firebase from 'firebase';

import UnderPane from '../components/UnderPane.js';

// const Stack = createStackNavigator({
//   List: { screen: List },
//   Detail: { screen: Detail },
// }, {
//   headerMode: 'none',
//   initialRouteParams: { onPress: this.onPressTest },
// });

class Home extends React.Component {
  state = {
    videoUrl: null,
  }

  componentWillMount() {
    // this.fetchInitialVideo();
    const categories = [
      'dribble',
      'shoot',
      'pass',
      'trap',
      'freeKick',
      'recent',
    ];
    categories.forEach((category) => {
      this.fetchVideos(category);
    });
  }

  componentDidMount() {
    // console.log(this.state.item);

    // const db = firebase.firestore();
    // db.collection("app").doc("currentState")
    //   .onSnapshot(function(doc) {
    //       console.log("Current data: ", doc.data());
    //   });

    // AsyncStorage.getItem('videos', (err, result) => {
    //   console.log(result);
    // });
  }

  // eslint-disable-next-line
  // fetchInitialVideo = () => {
  //   const storage = firebase.storage();
  //   const storageRef = storage.ref();
  //   const spaceRef = storageRef.child(`video/withoutComment/${this.state.item.id}.mp4`);
  //   spaceRef.getDownloadURL()
  //     .then((videoUrl) => {
  //       this.setState({ videoUrl });
  //     });
  // }

  // eslint-disable-next-line
  fetchVideos = (category) => {
    const db = firebase.firestore();
    let videosRef;
    if (category === 'recent') {
      const maxResults = 10;
      videosRef = db.collection('videos').orderBy('publishedAt', 'desc').limit(maxResults);
    } else {
      videosRef = db.collection('videos').where('category', '==', category);
    }

    let videos = [];
    videosRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          videos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        videos = this.shuffle(videos);
        console.log('videos');
        console.log(videos);

        switch (category) {
          case 'recent':
            this.onPressTest(videos[0]);
            this.setState({ recentVideos: videos });
            break;
          case 'dribble':
            this.setState({ dribbleVideos: videos });
            break;
          case 'shoot':
            this.setState({ shootVideos: videos });
            break;
          case 'pass':
            this.setState({ passVideos: videos });
            break;
          case 'trap':
            this.setState({ trapVideos: videos });
            break;
          case 'freeKick':
            this.setState({ freeKickVideos: videos });
            break;

          default:
            console.log('swtich error');
            break;
        }
      });
  }

  shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onPress = (item) => {
    this.setState({ item });
  }

  onPressTest = (item) => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const withoutCommentRef = storageRef.child(`video/withoutComment/${item.id}.mp4`);
    withoutCommentRef.getDownloadURL()
      .then((videoUrl) => {
        AsyncStorage.setItem('currentId', item.id, (err, result) => {
          console.log(result);
        });
        this.setState({ videoUrl });
      })
      .catch(() => {
        const withCommentRef = storageRef.child(`video/withComment/${item.id}.mp4`);
        withCommentRef.getDownloadURL()
          .then((videoUrl) => {
            AsyncStorage.setItem('currentId', item.id, (err, result) => {
              console.log(result);
            });
            this.setState({ videoUrl });
          })
          .catch(() => {
            Alert.alert('この動画はまだ利用できません。かたじけない！');
          });
      });
  }

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
        <UnderPane
          onPress={this.onPressTest}
          recentVideos={this.state.recentVideos}
          dribbleVideos={this.state.dribbleVideos}
          shootVideos={this.state.shootVideos}
          passVideos={this.state.passVideos}
          trapVideos={this.state.trapVideos}
          freeKickVideos={this.state.freeKickVideos}
        />
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
