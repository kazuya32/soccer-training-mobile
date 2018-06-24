import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import MovieButton from '../elements/MovieButton.js';
import TipsTile from './TipsTile.js';
import AdviceTile from './AdviceTile.js';

class Detail extends React.Component {
  render() {
    const item = this.props.navigation.getParam('item');
    console.log(item);

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
            tipsArray={item.data.point}
          />
          <TipsTile
            title="練習ステップ"
            tipsArray={item.data.practice}
          />
          <TipsTile
            title="失敗パターン"
            tipsArray={item.data.failure}
          />
          <TipsTile
            title="応用テクニック"
            tipsArray={item.data.advanced}
          />
          <AdviceTile
            title="実践アドバイス"
            comment={item.data.advice}
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
    backgroundColor: 'black',
  },
});

export default Detail;
