import React from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import defaultMovie from '../../defaultMovie.json';
import CloseButton from '../elements/CloseButton.js';
import TipsTile from './TipsTile.js';
import AdviceTile from './AdviceTile.js';
import UrlTile from './UrlTile.js';
import ShareTile from './ShareTile.js';

const defaultDesc = 'このアプリはプロのサッカー選手を目指すための技術を紹介しています。' +
  'サッカーの実践スキルを習得したい人や練習を指導する方のお役に立てると思います。\n\n' +
  '実践的なスキルを細かいポイントに分解することで' +
  'アクションを起こしやすくしています。\n\n' +
  'まずは好きなサッカー選手やスキルカテゴリの動画を選んで再生してみてください！';

class Detail extends React.Component {
  state = {
    buttonEnabled: true,
  }

  componentDidMount() {
    this.fetchSession();
  }

  onPressClose = () => {
    this.props.navigation.navigate({
      routeName: 'List',
    });
  }

  fetchSession = () => {
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.onSnapshot((doc) => {
      if (doc.exists) {
        const video = doc.data().currentVideo;
        const { buttonEnabled } = doc.data();
        if (video) {
          this.setState({ video, buttonEnabled });
        } else {
          const defaultVideo = { id: defaultMovie.id, data: {} };
          this.setState({ video: defaultVideo, buttonEnabled });
        }
      } else {
        Alert.alert('エラーが発生しました。');
        this.props.navigation.goBack();
      }
    });
  }

  render() {
    if (!this.state.video) {
      return (
        <View style={[styles.indicator]}>
          <ActivityIndicator animating={!this.state.video} size="large" color={designLanguage.colorPrimary} />
        </View>
      );
    }

    const isDefault = this.state.video.id === defaultMovie.id;
    const adviceTileName = isDefault ? 'このアプリについて' : '実践アドバイス';
    const advice = isDefault ? defaultDesc : this.state.video.data.advice;

    return (
      <View style={styles.container}>
        <ScrollView>
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
            title={adviceTileName}
            comment={advice}
          />
          <UrlTile
            show
            title="酒井潤公式HP"
            url="http://sakaijunsoccer.appspot.com/soccer"
          />
          <ShareTile
            show
            title="サッカー友達にシェアする"
          />
        </ScrollView>
        <CloseButton
          style={styles.button}
          buttonEnabled={this.state.buttonEnabled}
          onPress={this.onPressClose}
        />
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
  indicator: {
    flex: 1,
    backgroundColor: designLanguage.color50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    zIndex: 30,
  },
});

export default Detail;
