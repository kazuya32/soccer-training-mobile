import React from 'react';
import { createStackNavigator } from 'react-navigation';

import List from '../components/List.js';
import Detail from '../components/Detail.js';

class Stack extends React.Component {
  render() {
    const S = createStackNavigator({
      List: { screen: List },
      Detail: { screen: Detail },
    }, {
      headerMode: 'none',
      initialRouteParams: {
        onPress: this.props.onPress,
        recentVideos: this.props.recentVideos,
        dribbleVideos: this.props.dribbleVideos,
        shootVideos: this.props.shootVideos,
        passVideos: this.props.passVideos,
        trapVideos: this.props.trapVideos,
        freeKickVideos: this.props.freeKickVideos,
      },
    });

    return (
      <S />
    );
  }
}

export default Stack;
