import React from 'react';
import {
  View, Text, Button, TouchableOpacity
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
      title: "OrangeNotes",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#EE7600',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  });

  render() {
    const MainStackNavigationConstructor = this.createStackNavigator();
    return(
      <MainStackNavigationConstructor />
    )
  }
}
