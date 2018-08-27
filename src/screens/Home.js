import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  // PublisherBanner,
  AdMobRewarded,
  ScreenOrientation,
} from 'expo';

import ENV from '../../env.json';
import UnderPane from '../components/UnderPane.js';
import VideoPane from '../components/VideoPane.js';

// const ADUNITID = ENV.ADMOB_ADUNITID;
const BANNER_ID = ENV.ADMOB_BANNER_ID;
// const INTERSTITIAL_ID = ENV.ADMOB_INTERSTITIAL_ID;
// const REWARDED_ID = ENV.ADMOB_REWARDED_ID;


class Home extends React.Component {
  componentWillMount() {
    AsyncStorage.setItem('currentId', 'intro');
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
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

  render() {
    return (
      <View style={styles.container}>
        <VideoPane
          style={styles.videoPlayer}
        />
        <UnderPane />
      </View>
    );
  }
}

// <AdMobBanner
//   bannerSize="smartBannerPortrait"
//   adUnitID={BANNER_ID}
//   didFailToReceiveAdWithError={this.bannerError}
// />
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
    zIndex: 100,
  },
});

export default Home;

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
