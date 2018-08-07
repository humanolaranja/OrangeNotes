import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import Task from '../components/Task';
import MyStorage from '../libs/Storage';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class App extends React.Component {

  state = {
    tasks: []
  }

  async componentWillMount() {
    const tasks = await new MyStorage().load();
    this.setState({ tasks: tasks });
  }

  onPressRating = (index, value) => {
    const tasks = this.state.tasks;

    tasks[index].rating = value;

    this.setState({ tasks });
  }

  appendToTasks = (task) => {
    const tasks = this.state.tasks;
    tasks.push(task);
    this.setState({ tasks });
  }

  updateTasks = (tasks) => {
    this.setState({ tasks });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40, paddingBottom: 10, fontWeight: 'bold'}}> Minhas Tarefas </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('NewTask', {
            appendToTasks: this.appendToTasks
          })}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <FlatList
          extraData={this.state}
          data={this.state.tasks}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('TaskDetails', {
                task: item,
                updateTasks: this.updateTasks
              })}
            >
              <Task
                index={index}
                task={item}
                onPressRating={this.onPressRating}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    )
  }
}
