import React from 'react';
import { createStackNavigator } from 'react-navigation';

import List from '../components/List.js';
import Detail from '../components/Detail.js';

class UnderPane extends React.Component {
  render() {
    const Stack = createStackNavigator({
      List: { screen: List },
      Detail: { screen: Detail },
    }, {
      headerMode: 'none',
      mode: 'modal',
      initialRouteParams: {
      },
    });

    return (
      <Stack />
    );
  }
}

export default UnderPane;
