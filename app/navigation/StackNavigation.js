import React from 'react';
import {
  View, Text
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import NewTask from '../screens/NewTask';
import TaskDetails from '../screens/TaskDetails';

export default class MainStackNavigation extends React.Component {

  createStackNavigator = () => createStackNavigator({
    Main: {
      screen: Main
    },
    NewTask: {
      screen: NewTask
    },
    TaskDetails: {
      screen: TaskDetails
    }
  }, {
    initialRouteName: 'Main',
    navigationOptions: {
      header: ( /* Your custom header */
        <View
          style={{
            height: 80,
            marginTop: 20 /* only for IOS to give StatusBar Space */
          }}
        >
          <Text>This is CustomHeader</Text>
        </View>
      )
    }
  });

  render() {
    const MainStackNavigationConstructor = this.createStackNavigator();
    return(
      <MainStackNavigationConstructor />
    )
  }
}
