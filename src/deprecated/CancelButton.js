import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class CancelButton extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableHighlight style={styles.container} onPress={onPress} underlayColor="transparent">
        <View style={styles.button}>
          <Icon name="ios-arrow-back" size={30} color="#fff" style={styles.button} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
  },
  button: {
    flex: 1,
    borderRadius: 3,
    alignSelf: 'center',
  },
});

export default CancelButton;
