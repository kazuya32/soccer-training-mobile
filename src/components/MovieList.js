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
          category="recent"
          onPress={this.props.onPress}
          videos={this.props.recentVideos}
        />
        <Template
          tabLabel="ドリブル"
          category="dribble"
          onPress={this.props.onPress}
          videos={this.props.dribbleVideos}
        />
        <Template
          tabLabel="シュート"
          category="shoot"
          onPress={this.props.onPress}
          videos={this.props.shootVideos}
        />
        <Template
          tabLabel="パ ス"
          category="pass"
          onPress={this.props.onPress}
          videos={this.props.passVideos}
        />
        <Template
          tabLabel="トラップ"
          category="trap"
          onPress={this.props.onPress}
          videos={this.props.trapVideos}
        />
        <Template
          tabLabel="フリーキック"
          category="freeKick"
          onPress={this.props.onPress}
          videos={this.props.freeKickVideos}
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
