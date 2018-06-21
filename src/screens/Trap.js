import React from 'react';
import { StyleSheet, View } from 'react-native';

import Template from '../components/Template.js';
import BackgroundImage from '../../assets/bgImage/bg.jpg';

class FreeKick extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Template
          navigation={this.props.navigation}
          tileColor="#272C35"
          // tileColor="#0787C3"
          backgroundImage={BackgroundImage}
          category="trap"
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
