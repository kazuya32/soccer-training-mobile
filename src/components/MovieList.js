import React from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Template from './Template.js';

class MovieList extends React.Component {
  renderTabBar = () => <ScrollableTabBar style={styles.header} activeTab={styles.activeTab} />;

  render() {
    return (
      <ScrollableTabView
        renderTabBar={this.renderTabBar}
        tabBarUnderlineStyle={styles.underline}
        tabBarBackgroundColor="#102330"
        tabBarActiveTextColor="#fff"
        tabBarInactiveTextColor="#fff"
        // tabBarTextStyle
      >
        <Template
          tabLabel="新着"
          // navigation={this.props.navigation}
          category="recent"
        />
        <Template
          tabLabel="ドリブル"
          // navigation={this.props.navigation}
          category="recent"
        />
        <Template
          tabLabel="シュート"
          // navigation={this.props.navigation}
          category="recent"
        />
        <Template
          tabLabel="パ ス"
          // navigation={this.props.navigation}
          category="recent"
        />
        <Template
          tabLabel="トラップ"
          // navigation={this.props.navigation}
          category="recent"
        />
        <Template
          tabLabel="フリーキック"
          // navigation={this.props.navigation}
          category="recent"
        />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#272C35',
  },
  underline: {
    backgroundColor: '#fff',
  },
  activeTab: {
    borderColor: '#fff',
    borderWidth: 1,
  },
});


export default MovieList;
