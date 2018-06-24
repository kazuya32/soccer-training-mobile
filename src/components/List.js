import React from 'react';
import { View, StyleSheet } from 'react-native';

import MovieList from '../components/MovieList.js';
import TipsButton from '../elements/TipsButton.js';


class List extends React.Component {
  state = {
    item: null,
  }

  componentWillMount() {
    // console.log(this.props.navigation.getParam('onPress'));
    console.log(this.props.navigation.state);
  }

  onPress = (item) => {
    const setVideo = this.props.navigation.getParam('onPress');
    setVideo(item);
    this.setState({ item });
  }

  render() {
    return (
      <View style={styles.container}>
        <MovieList
          onPress={this.onPress}
          recentVideos={this.props.navigation.getParam('recentVideos')}
          dribbleVideos={this.props.navigation.getParam('dribbleVideos')}
          shootVideos={this.props.navigation.getParam('shootVideos')}
          passVideos={this.props.navigation.getParam('passVideos')}
          trapVideos={this.props.navigation.getParam('trapVideos')}
          freeKickVideos={this.props.navigation.getParam('freeKickVideos')}
        />
        <TipsButton
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'Detail',
              params: { item: this.state.item },
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
    backgroundColor: 'black',
  },
});

export default List;
