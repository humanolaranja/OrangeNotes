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
import { Button } from 'react-native-elements'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class App extends React.Component {

  static navigationOptions = {
    title: 'OrangeNotes',
  };

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
        <Button
          small
          buttonStyle={{marginTop:10, backgroundColor: '#EE7600'}}
          onPress={() => this.props.navigation.navigate('NewTask', {appendToTasks: this.appendToTasks})}
          icon={{name: 'plus', type: 'font-awesome'}}
          title='Nova Nota' />
        <FlatList
          style={{flex:1}}
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
