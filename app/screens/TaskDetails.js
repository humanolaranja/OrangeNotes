import React from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import MyStorage from '../libs/Storage';


export default class TaskDetails extends React.Component {
  static navigationOptions = {
    title: 'Detalhes',
  };

  deleteTask = async () => {
    const task = this.props.navigation.getParam('task', {});
    const updateTasks = this.props.navigation.getParam('updateTasks');
    const tasks = await new MyStorage().destroy(task.id);
    updateTasks(tasks);
    this.props.navigation.goBack();
  }

  updateTest = async () => {
    const task = this.props.navigation.getParam('task', {});
    const updateTasks = this.props.navigation.getParam('updateTasks');
    const tasks = await new MyStorage().update(task.id, 'DEU CERTO');
    updateTasks(tasks);
    this.props.navigation.goBack();
  }

  render() {
    const task = this.props.navigation.getParam('task', {});

    return (
      <View>
        <Card title={task.title}>
          <View>
            <Text>{task.description}</Text>
          </View>
        </Card>
        <Icon
          raised
          name='trash'
          type='font-awesome'
          color='#f50'
          onPress={this.deleteTask} />
        <Icon
          raised
          name='edit'
          type='font-awesome'
          color='#000000'
          onPress={this.updateTest} />
      </View>
    )
  }
}
