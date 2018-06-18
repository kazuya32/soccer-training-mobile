import React from 'react';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import ENV from './env.json';
import Recent from './src/screens/Recent.js';
import Dribble from './src/screens/Dribble.js';
import Shoot from './src/screens/Shoot.js';
import Pass from './src/screens/Pass.js';
import Trap from './src/screens/Trap.js';
import FreeKick from './src/screens/FreeKick.js';

import VideoPlayer from './src/screens/VideoPlayer.js';
// import YoutubePlayer from './src/screens/YoutubePlayer.js';

// eslint-disable-next-line
require('firebase/firestore');
// eslint-disable-next-line
console.ignoredYellowBox = ['Remote debugger'];

// eslint-disable-next-line
const config = {
  apiKey:            ENV.FIREBASE_API_KEY,
  authDomain:        ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL:       ENV.FIREBASE_DB_URL,
  projectId:         ENV.FIREBASE_PROJECT_ID,
  storageBucket:     ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
};
firebase.initializeApp(config);

const RecentStack = createStackNavigator({
  Recent: { screen: Recent },
  VideoPlayer: { screen: VideoPlayer },
}, {
  headerMode: 'none',
});

const DribbleStack = createStackNavigator({
  Dribble: { screen: Dribble },
  VideoPlayer: { screen: VideoPlayer },
}, {
  headerMode: 'none',
});

const ShootStack = createStackNavigator({
  Shoot: { screen: Shoot },
  VideoPlayer: { screen: VideoPlayer },
}, {
  headerMode: 'none',
});

const PassStack = createStackNavigator({
  Pass: { screen: Pass },
  VideoPlayer: { screen: VideoPlayer },
}, {
  headerMode: 'none',
});

const TrapStack = createStackNavigator({
  Trap: { screen: Trap },
  VideoPlayer: { screen: VideoPlayer },
}, {
  headerMode: 'none',
});

const FreeKickStack = createStackNavigator({
  FreeKick: { screen: FreeKick },
  VideoPlayer: { screen: VideoPlayer },
}, {
  headerMode: 'none',
});

class App extends React.Component {
  render() {
    return (
      <ScrollableTabView
        style={{ paddingTop: 40 }}
      >
        <RecentStack tabLabel="新着" />
        <DribbleStack tabLabel="ドリブル" />
        <ShootStack tabLabel="シュート" />
        <PassStack tabLabel="パス" />
        <TrapStack tabLabel="トラップ" />
        <FreeKickStack tabLabel="フリーキック" />
      </ScrollableTabView>
    );
  }
}

export default App;
