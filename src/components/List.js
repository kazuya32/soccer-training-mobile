import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Segment } from 'expo';
import firebase from 'firebase';

import defaultMovie from '../../defaultMovie.json';
import MovieList from '../components/MovieList.js';
import TipsButton from '../elements/TipsButton.js';


class List extends React.Component {
  state = {
    buttonEnabled: true,
    hasContent: false,
  }

  componentDidMount() {
    this.fetchSession();
  }
  // eslint-disable-next-line
  fetchSession = () => {
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        const { currentVideo, buttonEnabled, rate } = doc.data();
        const hasContent = currentVideo && currentVideo.id !== defaultMovie.id;
        this.setState({ hasContent, buttonEnabled, currentVideo, rate });
      }
    });
  }

  onButtonPress = async () => {
    const videoTitle = this.state.currentVideo ? this.state.currentVideo.id : defaultMovie.id;
    const properties = { category: 'video', label: videoTitle };

    const screenName = 'Detail';
    Segment.screenWithProperties(screenName, properties);

    // const event = 'Detail Viewed';
    // const event = 'Detail';
    // Segment.trackWithProperties(event, properties);


    this.props.navigation.navigate({
      routeName: 'Detail',
      params: {
        video: this.state.currentVideo,
        rate: this.state.rate,
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MovieList />
        <TipsButton
          onPress={this.onButtonPress}
          style={[
            styles.tipsButton,
          ]}
          buttonEnabled={this.state.buttonEnabled}
          hasContent={this.state.hasContent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tipsButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    zIndex: 30,
  },
});

export default List;
