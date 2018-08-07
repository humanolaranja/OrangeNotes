import React from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import MyStorage from '../libs/Storage';


export default class TaskDetails extends React.Component {

  deleteTask = async () => {
    const task = this.props.navigation.getParam('task', {});
    const updateTasks = this.props.navigation.getParam('updateTasks');
    const tasks = await new MyStorage().destroy(task.id);
    updateTasks(tasks);
    this.props.navigation.goBack();
  }

  render() {
    const task = this.props.navigation.getParam('task', {});

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <Text>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.deleteTask}
        >
          <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>
        <Text>{task.title}</Text>
      </View>
    )
  }
}
