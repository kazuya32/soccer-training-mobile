import React from 'react';
import { View, StyleSheet } from 'react-native';

import MovieButton from '../elements/MovieButton.js';

class Detail extends React.Component {
  render() {
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102330',
  },
});

export default Detail;
