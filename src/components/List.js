import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';

import MovieList from '../components/MovieList.js';
import TipsButton from '../elements/TipsButton.js';


class List extends React.Component {
  state = {
    buttonEnabled: true,
    currentVideo: false,
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
        this.setState({ currentVideo, buttonEnabled });
      }
    });
  }

  onButtonPress = async () => {
    this.props.navigation.navigate({
      routeName: 'Detail',
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
          hasContent={this.state.currentVideo}
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
