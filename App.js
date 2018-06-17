import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';

import ENV from './env.json';
import Recent from './src/screens/Recent.js';
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

const App = createStackNavigator({
  Recent: { screen: Recent },
  VideoPlayer: { screen: VideoPlayer },
}, {
  headerMode: 'none',
  // navigationOptions: {
  //   headerTitle: 'FLEGO',
  //   headerStyle: {
  //     backgroundColor: '#FCFCFC',
  //     shadowColor: '#000',
  //     shadowOffset: { width: 0, height: 0 },
  //     shadowOpacity: 0.3,
  //     shadowRadius: 1,
  //     paddingRight: 14,
  //     paddingLeft: 14,
  //   },
  //   headerTitleStyle: {
  //     color: '#000000',
  //   },
  //   headerTintColor: '#fff',
  //   headerBackTitle: '<',
  //   headerLeft: <FontAwesomeIcon name="user-circle-o" size={24} />,
  //   headerRight: <MaterialCommunityIcon name="bell-outline" size={24} />,
  // },
});

export default App;
