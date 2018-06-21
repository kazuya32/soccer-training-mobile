import React from 'react';
import { StyleSheet, View } from 'react-native';

import Template from '../components/Template.js';
import BackgroundImage from '../../assets/bgImage/image10.jpg';

class Pass extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Template
          navigation={this.props.navigation}
          tileColor="#272C35"
          backgroundImage={BackgroundImage}
          category="pass"
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

export default Pass;
