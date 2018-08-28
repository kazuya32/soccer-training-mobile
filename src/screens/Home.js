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
  FileSystem,
} from 'expo';
import { Circle } from 'react-native-progress';

import designLanguage from '../../designLanguage.json';
import movieList from '../../movieList.json';
import ENV from '../../env.json';
import UnderPane from '../components/UnderPane.js';
import VideoPane from '../components/VideoPane.js';

// const ADUNITID = ENV.ADMOB_ADUNITID;
const BANNER_ID = ENV.ADMOB_BANNER_ID;
// const INTERSTITIAL_ID = ENV.ADMOB_INTERSTITIAL_ID;
// const REWARDED_ID = ENV.ADMOB_REWARDED_ID;


class Home extends React.Component {
  state = {
    initialized: false,
    introRemoteUri: movieList.introduction,
    // introRemoteUri: movieList.test,
  }

  componentWillMount() {
    AsyncStorage.setItem('currentId', 'intro');
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
    this.fetchDefaultVideo();
  }

  // eslint-disable-next-line
  initAdMob = () => {
    // AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
    // AdMobInterstitial.setTestDeviceID('EMULATOR');
    // AdMobRewarded.setAdUnitID(REWARDED_ID);
    // AdMobRewarded.setTestDeviceID('EMULATOR');
  }

  fetchDefaultVideo = () => {
    const defaultFile = 'introduction.mp4';
    // const defaultFile = 'test.mp4';
    const defaultUri = `${FileSystem.documentDirectory}${defaultFile}`;
    FileSystem.getInfoAsync(defaultUri)
      .then(({ exists }) => {
        if (exists) {
          this.setState({ initialized: exists, defaultUri });
        } else {
          this.writeDocument(this.state.introRemoteUri, defaultUri);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  }

  setProgress = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    // eslint-disable-next-line
    console.log(progress);
    this.setState({
      progress,
    });
  };

  writeDocument = async (remoteUri, localUri) => {
    const downloadResumable = FileSystem.createDownloadResumable(
      remoteUri,
      localUri,
      {},
      this.setProgress,
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      // eslint-disable-next-line
      console.log('Finished downloading to ', uri);
      this.setState({ initialized: true, defaultUri: uri });
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
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
    if (!this.state.initialized) {
      return (
        <View
          style={[styles.container, { justifyContent: 'center' }]}
        >
          <Circle
            progress={this.state.progress}
            size={120}
            borderWidth={0}
            color={designLanguage.colorPrimary}
            style={{ alignSelf: 'center' }}
            textStyle={{ fontSize: 32 }}
            endAngle={1}
            showsText
            thickness={8}
            strokeCap="round"
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <VideoPane
          style={styles.videoPlayer}
          defaultUri={this.state.defaultUri}
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
    backgroundColor: designLanguage.color50,
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
