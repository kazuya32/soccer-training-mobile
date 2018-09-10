import { AsyncStorage } from 'react-native';
import { Segment, Constants } from 'expo';
import firebase from 'firebase';
import uuid from 'uuid';

import ENV from './env.json';
import Home from './src/screens/Home.js';

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

const androidWriteKey = ENV.SEGMENT_WRITE_KEY;
const iosWriteKey = ENV.SEGMENT_WRITE_KEY;
Segment.initialize({ androidWriteKey, iosWriteKey });

try {
  const deviceId = Constants.platform.OS === 'ios' ? Constants.installationId : uuid.v1();
  console.log(deviceId);
  // Segment.identify(deviceId);
} catch (error) {
  console.log('error in identify');
}

if (Constants.platform.OS === 'ios') {
  const deviceId = Constants.installationId;
  console.log(deviceId);
  // Segment.identify(deviceId);
} else {
  AsyncStorage.getItem('deviceId')
    .then((value) => {
      console.log('deviceId existed');
      console.log(value);
    })
    .catch((error) => {
      console.log('No deviceId');
    });
}

export default Home;
