import React from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';

import designLanguage from '../../designLanguage.json';
import CloseButton from '../elements/CloseButton.js';
import TipsTile from './TipsTile.js';
import AdviceTile from './AdviceTile.js';
import UrlTile from './UrlTile.js';

const defaultDesc = 'このアプリはプロのサッカー選手を目指すための技術を紹介しています。' +
  'サッカーの実践スキルを習得したい人や練習を指導する方のお役に立てると思います。\n\n' +
  '実践的なスキルを細かいポイントに分解することで' +
  'アクションを起こしやすくしています。\n\n' +
  'まずは好きなサッカー選手やスキルカテゴリの動画を選んで再生してみてください！';

class Detail extends React.Component {
  state = {
    buttonEnabled: true,
    video: {
      data: {
        advice: defaultDesc,
      },
    },
  }

  componentDidMount() {
    this.fetchSession();
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
          this.setState({ buttonEnabled });
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
          <ActivityIndicator animating={!this.state.loaded} size="large" color={designLanguage.colorPrimary} />
        </View>
      );
    }

    const adviceTileName = this.state.video.id ? '実践アドバイス' : 'このアプリについて';

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
            comment={this.state.video && this.state.video.data.advice}
          />
          <UrlTile
            show={!this.state.video.id}
            title="酒井潤公式HP"
            url="http://sakaijunsoccer.appspot.com/soccer"
          />
        </ScrollView>
        <CloseButton
          style={styles.button}
          buttonEnabled={this.state.buttonEnabled}
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'List',
            });
          }}
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
