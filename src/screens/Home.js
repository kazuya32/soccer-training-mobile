import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  // PublisherBanner,
  AdMobRewarded,
} from 'expo';

import ENV from '../../env.json';
import UnderPane from '../components/UnderPane.js';
import VideoPane from '../components/VideoPane.js';

// const ADUNITID = ENV.ADMOB_ADUNITID;
const BANNER_ID = ENV.ADMOB_BANNER_ID;
// const INTERSTITIAL_ID = ENV.ADMOB_INTERSTITIAL_ID;
// const REWARDED_ID = ENV.ADMOB_REWARDED_ID;


class Home extends React.Component {
  state = {
  }

  componentWillMount() {
    AsyncStorage.setItem('currentId', 'intro');
  }

  // eslint-disable-next-line
  initAdMob = () => {
    // AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
    // AdMobInterstitial.setTestDeviceID('EMULATOR');
    // AdMobRewarded.setAdUnitID(REWARDED_ID);
    // AdMobRewarded.setTestDeviceID('EMULATOR');
  }

  openInterstitial = async () => {
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

  openRewarded = async () => {
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  // eslint-disable-next-line
  // dangerous = () => {
  //     const db = firebase.firestore();
  //     videosRef = db.collection('videos');
  //     videosRef.get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           ref = db.collection('videos').doc(doc.id);
  //           ref.update({
  //               "advanced": [],
  //               "failure": [],
  //               "practice": [],
  //               "point": [],
  //               "advice": '',
  //           })
  //           .then(function() {
  //               console.log("Document successfully updated!");
  //           });
  //         });
  //       });
  // }

  render() {
    return (
      <View style={styles.container}>
        <VideoPane
          style={styles.videoPlayer}
        />
        <UnderPane />
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={BANNER_ID}
          didFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    );
  }
}

// <PublisherBanner
//   bannerSize="fullBanner"
//   style={{ display: 'none' }}
//   adUnitID={BANNER_ID}
//   onDidFailToReceiveAdWithError={this.bannerError}
//   onAdMobDispatchAppEvent={this.adMobEvent}
// />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoPlayer: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    zIndex: 50,
  },
});

export default Home;
