import React from 'react';
import {
  StyleSheet,
  View,
  Text,
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
import defaultMovie from '../../defaultMovie.json';
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
    introRemoteUri: defaultMovie.downloadURL,
    // introRemoteUri: defaultMovie.testURL,
  }

  componentWillMount() {
    this.fetchDefaultVideo();
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
  }

  // eslint-disable-next-line
  initAdMob = () => {
    // AdMobInterstitial.setAdUnitID(INTERSTITIAL_ID);
    // AdMobInterstitial.setTestDeviceID('EMULATOR');
    // AdMobRewarded.setAdUnitID(REWARDED_ID);
    // AdMobRewarded.setTestDeviceID('EMULATOR');
  }

  fetchDefaultVideo = () => {
    const digestYoutubeId = defaultMovie.youtubeId;
    const defaultUri = `${FileSystem.documentDirectory}${digestYoutubeId}.mp4`;
    // const defaultUri = FileSystem.cacheDirectory + 'test7.mp4';
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
    const progressBar = this.state.progress ? (
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
    ) : null;

    if (!this.state.initialized) {
      const loadingText = 'Loading(80.3MB)';
      return (
        <View style={[styles.container, { justifyContent: 'center' }]} >
          <Text style={styles.loading}>
            {this.state.progress && loadingText}
          </Text>
          {progressBar}
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
  loading: {
    padding: 32,
    color: designLanguage.colorPrimary,
    textAlign: 'center',
    fontSize: 24,
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
