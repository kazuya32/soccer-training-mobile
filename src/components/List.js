import React from 'react';
import { View, StyleSheet } from 'react-native';

import MovieList from '../components/MovieList.js';
import TipsButton from '../elements/TipsButton.js';


class List extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MovieList />
        <TipsButton
          onPress={() => {
            this.props.navigation.navigate({
              routeName: 'Detail',
              // params: item,
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
