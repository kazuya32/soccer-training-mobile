import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';

class TipsTile extends React.Component {
  state = {}

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <View style={styles.tips}>
      <Text style={styles.tipsIndex}>
        {`${index + 1}`}
      </Text>
      <Text style={styles.tipsItem}>
        {item}
      </Text>
    </View>
  )


  render() {
    const {
      title,
      tipsArray,
    } = this.props;

    if (!(tipsArray && tipsArray.length)) { return null; }

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
        <FlatList
          data={tipsArray}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          style={styles.tipsPane}
        />
      </View>
    );
  }
}

// `＜ ${title} ＞`

const styles = StyleSheet.create({
  container: {
  },
  title: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#102330',
  },
  tipsPane: {
    // backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 28,
    paddingRight: 28,
  },
  tips: {
    flexDirection: 'row',
    // paddingTop: 8,
    // paddingBottom: 8,
    // paddingLeft: 28,
    // paddingRight: 28,
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  tipsItem: {
    // color: '#102330',
    color: '#fff',
    fontSize: 18,
    paddingTop: 4,
    alignSelf: 'flex-start',
  },
  tipsIndex: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'flex-start',
    width: 16,
    paddingTop: 4,
  },
});

export default TipsTile;
