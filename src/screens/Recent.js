import React from 'react';
import {
  StyleSheet,
  View,
  // WebView,
} from 'react-native';

import Template from '../components/Template.js';
import BackgroundImage from '../../assets/bgImage/image9.jpg';

class Recent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Template
          navigation={this.props.navigation}
          tileColor="#272C35"
          backgroundImage={BackgroundImage}
          category="recent"
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

export default Recent;
