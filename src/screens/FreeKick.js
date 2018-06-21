import React from 'react';
import { StyleSheet, View } from 'react-native';

import Template from '../components/Template.js';
import BackgroundImage from '../../assets/bgImage/image4.jpg';

class FreeKick extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Template
          navigation={this.props.navigation}
          tileColor="#272C35"
          backgroundImage={BackgroundImage}
          category="freeKick"
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

export default FreeKick;
