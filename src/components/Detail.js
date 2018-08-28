import React from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import MovieButton from '../elements/MovieButton.js';
import TipsTile from './TipsTile.js';
import AdviceTile from './AdviceTile.js';
import UrlTile from './UrlTile.js';

class Detail extends React.Component {
  state = {}

  // componentWillMount() {
  //   this.fetchVideoData();
  // }
  //
  // fetchVideoData = () => {
  //   const currentVideoId = this.props.navigation.getParam('currentVideoId');
  //
  //   const db = firebase.firestore();
  //   const videoRef = db.collection('videos').doc(currentVideoId);
  //   videoRef.get().then((doc) => {
  //     if (doc.exists) {
  //       const video = { id: doc.id, data: doc.data() };
  //       this.setState({ video });
  //     } else {
  //       Alert.alert('エラーが起こりました。');
  //       this.props.navigation.goBack();
  //     }
  //   }).catch((error) => {
  //     // eslint-disable-next-line
  //     console.error('Error getting document: ', error);
  //     Alert.alert('エラーが起こりました。');
  //   });
  // }

  componentDidMount() {
    this.fetchSession();
  }

  fetchSession = () => {
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        const video = doc.data().currentVideo;
        this.setState({ video });
      } else {
        Alert.alert('エラーが発生しました。');
        this.props.navigation.goBack();
      }
    });
  }

  render() {
    if (!this.state.video) {
      return (
        <View style={[styles.container, { padding: 100, alignSelf: 'center' }]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MovieButton
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'List',
              // params: item,
            });
          }}
        />
        <ScrollView >
          <TipsTile
            title="スキルのポイント"
            tipsArray={this.state.video && this.state.video.data.point}
          />
          <TipsTile
            title="練習ステップ"
            tipsArray={this.state.video && this.state.video.data.practice}
          />
          <TipsTile
            title="失敗パターン"
            tipsArray={this.state.video && this.state.video.data.failure}
          />
          <TipsTile
            title="応用テクニック"
            tipsArray={this.state.video && this.state.video.data.advanced}
          />
          <AdviceTile
            title="実践アドバイス"
            comment={this.state.video && this.state.video.data.advice}
          />
          <UrlTile
            title="酒井潤公式HP"
            url="http://sakaijunsoccer.appspot.com/soccer"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#102330',
    backgroundColor: designLanguage.color50,
  },
});

export default Detail;
