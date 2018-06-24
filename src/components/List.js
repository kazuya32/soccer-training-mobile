import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import MovieList from '../components/MovieList.js';
import TipsButton from '../elements/TipsButton.js';


class List extends React.Component {
  state = {}

  // componentWillMount() {
  //   this.setState({ item: this.props.navigation.getParam('initialItem') });
  // }

  onTilePress = (item) => {
    const setVideo = this.props.navigation.getParam('onPress');
    setVideo(item);
  }

  onButtonPress = () => {
    const item = this.props.navigation.getParam('currentItem');
    if (item) {
      this.props.navigation.navigate({
        routeName: 'Detail',
        params: { item },
      });
    } else {
      Alert.alert('動画を一つ選んでからもう一度押してください。');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MovieList
          onPress={this.onTilePress}
          recentVideos={this.props.navigation.getParam('recentVideos')}
          dribbleVideos={this.props.navigation.getParam('dribbleVideos')}
          shootVideos={this.props.navigation.getParam('shootVideos')}
          passVideos={this.props.navigation.getParam('passVideos')}
          trapVideos={this.props.navigation.getParam('trapVideos')}
          freeKickVideos={this.props.navigation.getParam('freeKickVideos')}
        />
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
