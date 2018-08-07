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
import { Button, List, ListItem } from 'react-native-elements';


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


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    return (
      <View>
        <Button
          small
          buttonStyle={{marginTop:20, backgroundColor: '#EE7600'}}
          onPress={() => this.props.navigation.navigate('NewTask', {appendToTasks: this.appendToTasks})}
          icon={{name: 'plus', type: 'font-awesome'}}
          title='Nova Nota' />
        <List>
          <FlatList
            extraData={this.state}
            data={this.state.tasks}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item, index }) => (
              <ListItem
                onPress={() => this.props.navigation.navigate('TaskDetails', {
                  task: item,
                  updateTasks: this.updateTasks
                })}
                title={`${item.title}`}
              />
            )}
            keyExtractor={item => item.title}
          />
        </List>
      </View>
    )
  }
}
