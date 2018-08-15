import React from 'react';
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';

import MovieList from '../components/MovieList.js';
import TipsButton from '../elements/TipsButton.js';


class List extends React.Component {
  onButtonPress = async () => {
    const currentVideoId = await AsyncStorage.getItem('currentId');

    if (!currentVideoId || (currentVideoId === 'intro')) {
      Alert.alert('動画を選んでください。');
    } else {
      this.props.navigation.navigate({
        routeName: 'Detail',
        params: { currentVideoId },
        // key: 'Detail' + currentVideoId,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MovieList />
        <TipsButton
          onPress={this.onButtonPress}
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
});

export default List;
