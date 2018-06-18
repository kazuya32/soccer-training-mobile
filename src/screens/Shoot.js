import React from 'react';
import { StyleSheet, View } from 'react-native';

import CategoryList from '../components/CategoryList.js';
import BackgroundImage from '../../assets/bgImage/image4.jpg';

class Shoot extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CategoryList
          navigation={this.props.navigation}
          tileColor="#272C35"
          backgroundImage={BackgroundImage}
          category="shoot"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Shoot;
