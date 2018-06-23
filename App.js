import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';

import ENV from './env.json';
import Home from './src/screens/Home.js';

// import VideoPlayer from './src/screens/VideoPlayer.js';
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
  Home: { screen: Home },
}, {
  headerMode: 'none',
});


export default App;
