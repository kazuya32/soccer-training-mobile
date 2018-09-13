import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';
import { ButtonGroup } from 'react-native-elements';

import designLanguage from '../../designLanguage.json';

class RateToggle extends React.Component {
  state = {
    buttons: [0.5, 1.0, 1.5, 2.0, 2.5],
    selectedIndex: 1,
  }

  componentDidMount() {
    this.initRate();
  }

  // eslint-disable-next-line
  initRate = () => {
    const { initialRate } = this.props;
    if (initialRate) {
      const index = this.state.buttons.indexOf(initialRate);
      if (index !== -1) {
        this.setState({ selectedIndex: index });
      }
    }
  }

  setRate = (selectedIndex) => {
    const rate = this.state.buttons[selectedIndex];
    const db = firebase.firestore();
    const sessionRef = db.collection('sessions').doc(Constants.sessionId);
    sessionRef.set({
      rate,
    }, { merge: true });
  }

  onPress = (selectedIndex) => {
    this.setRate(selectedIndex);
    this.updateIndex(selectedIndex);
  }

  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  render() {
    const {
      title,
      show,
    } = this.props;

    if (!show) { return null; }

    return (
      <View
        style={[
          styles.container,
        ]}
      >
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        <ButtonGroup
          onPress={this.onPress}
          selectedIndex={this.state.selectedIndex}
          buttons={this.state.buttons}
          containerStyle={styles.toggle}
          selectedButtonStyle={styles.selectedButton}
          underlayColor="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: designLanguage.color900,
  },
  toggle: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  selectedButton: {
    backgroundColor: designLanguage.color700,
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default RateToggle;
