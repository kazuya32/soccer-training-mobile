import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

class TipsButton extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.container} onPress={onPress} underlayColor="transparent">
        <TouchableHighlight onPress={onPress} style={styles.button}>
          <Text style={styles.buttonTitle}>
            コツ
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#808080',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  buttonTitle: {
    fontSize: 18,
    color: '#102330',
    fontWeight: '500',
    padding: 6,
  },
});

export default TipsButton;
