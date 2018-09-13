import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import designLanguage from '../../designLanguage.json';
import defaultMovie from '../../defaultMovie.json';
import CloseButton from '../elements/CloseButton.js';
import TipsTile from './TipsTile.js';
import AdviceTile from './AdviceTile.js';
import UrlTile from './UrlTile.js';
import ShareTile from './ShareTile.js';
import Toggle from './Toggle.js';
import RateToggle from './RateToggle.js';

const defaultDesc = 'このアプリはプロのサッカー選手を目指すための技術を紹介しています。' +
  'サッカーの実践スキルを習得したい人や練習を指導する方のお役に立てると思います。\n\n' +
  '実践的なスキルを細かいポイントに分解することで' +
  'アクションを起こしやすくしています。\n\n' +
  'まずは好きなサッカー選手やスキルカテゴリの動画を選んで再生してみてください！';

class Detail extends React.Component {
  state = {
    buttonEnabled: true,
    // granted: false,
  }

  componentWillMount() {
    // if (Platform.OS === 'android') {
    //   this.fetchPermissionInfo();
    // }
    // this.fetchSession();
  }

  onPressClose = () => {
    this.props.navigation.navigate({
      routeName: 'List',
    });
  }

  // fetchPermissionInfo = async () => {
  //   const value = await AsyncStorage.getItem('granted');
  //   this.setState({ granted: (value === 'true') });
  // }

  // askPermission = async () => {
  //   if (this.state.granted) {
  //     await AsyncStorage.setItem('granted', 'false');
  //     this.setState({ granted: false });
  //   } else {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status === 'granted') {
  //       this.setState({ granted: true });
  //       await AsyncStorage.setItem('granted', 'true');
  //     }
  //   }
  // }

  render() {
    const video = this.props.navigation.state.params.video || { id: defaultMovie.id, data: {} };
    const rate = this.props.navigation.state.params.rate || 1.0;

    const isDefault = video.id === defaultMovie.id;
    const adviceTileName = isDefault ? 'このアプリについて' : '実践アドバイス';
    const advice = isDefault ? defaultDesc : video.data.advice;

    return (
      <View style={styles.container}>
        <ScrollView>
          <RateToggle
            show
            title="再生スピード"
            initialRate={rate}
          />
          <TipsTile
            title="スキルのポイント"
            tipsArray={video.data.point}
          />
          <TipsTile
            title="練習ステップ"
            tipsArray={video.data.practice}
          />
          <TipsTile
            title="失敗パターン"
            tipsArray={video.data.failure}
          />
          <TipsTile
            title="応用テクニック"
            tipsArray={video.data.advanced}
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
          <Toggle
            show={false}
            // show={isDefault && Platform.OS === 'android'}
            title="外部ストレージを使用する"
            leftText="No"
            rightText="Yes"
            value={this.state.granted}
            onValueChange={this.askPermission}
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
