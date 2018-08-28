import React from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import designLanguage from '../../designLanguage.json';
import Template from './Template.js';

class MovieList extends React.Component {
  renderTabBar = () => <ScrollableTabBar style={styles.header} activeTab={styles.activeTab} />;

  render() {
    return (
      <ScrollableTabView
        renderTabBar={this.renderTabBar}
        tabBarUnderlineStyle={styles.underline}
        tabBarBackgroundColor={designLanguage.color900}
        tabBarActiveTextColor={designLanguage.color50}
        tabBarInactiveTextColor={designLanguage.color50}
        // tabBarTextStyle
      >
        <Template
          tabLabel="新着"
          category="recent"
        />
        <Template
          tabLabel="ドリブル"
          category="dribble"
        />
        <Template
          tabLabel="シュート"
          category="shoot"
        />
        <Template
          tabLabel="パ ス"
          category="pass"
        />
        <Template
          tabLabel="トラップ"
          category="trap"
        />
        <Template
          tabLabel="フリーキック"
          category="freeKick"
        />
      </ScrollableTabView>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    shadowColor: designLanguage.color50,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: '#272C35',
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
