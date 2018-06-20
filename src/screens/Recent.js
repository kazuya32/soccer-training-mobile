import React from 'react';
import {
  StyleSheet,
  View,
  // WebView,
} from 'react-native';

import CategoryList from '../components/CategoryList.js';
import BackgroundImage from '../../assets/bgImage/image9.jpg';

class Recent extends React.Component {
  render() {
    // const source = 'https://www.youtube.com/embed/$?rel=0&autoplay=1&showinfo=0&controls=0&loop=1=0&loop=1';

    return (
      <View style={styles.container}>
        <CategoryList
          navigation={this.props.navigation}
          tileColor="#272C35"
          backgroundImage={BackgroundImage}
          category="recent"
        />
      </View>
    );
  }
}

// <WebView
//   style={styles.videoPlayer}
//   javaScriptEnabled
//   source={{ uri: source }}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayer: {
    // flex: 1,
    // marginBottom: Dimensions.get('window').height * 0.2,
    width: '80%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
});

export default Recent;
