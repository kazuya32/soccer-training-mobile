import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';

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
        const { currentVideo, buttonEnabled } = doc.data();
        const hasContent = currentVideo && currentVideo.id !== defaultMovie.id;
        this.setState({ hasContent, buttonEnabled });
      }
    });
  }

  onButtonPress = async () => {
    this.props.navigation.navigate({
      routeName: 'Detail',
    });
  }

  render() {
    const animation = this.state.hasContent ? 'bounce' : null;
    return (
      <View style={styles.container}>
        <MovieList />
        <Animatable.View animation={animation} iterationCount={1} direction="alternate" duration={2000}>
          <TipsButton
            onPress={this.onButtonPress}
            style={[
              styles.tipsButton,
            ]}
            buttonEnabled={this.state.buttonEnabled}
            hasContent={this.state.hasContent}
          />
        </Animatable.View>
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
