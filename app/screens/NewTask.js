import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';
import Rating from '../components/Rating';
import MyStorage from '../libs/Storage';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 5
  }
})

export default class NewTask extends React.Component {
  state = {
    title: '',
    description: '',
    rating: 1
  }

  saveTask = async () => {
    const updateTasks = this.props.navigation.getParam('updateTasks');
    const appendToTasks = this.props.navigation.getParam('appendToTasks');
    const task = this.state;

    const savedTask = await new MyStorage().add(task);
    appendToTasks(savedTask);
    this.props.navigation.goBack();
  }

  render () {
    return (
      <View>
      <Text style={{ fontSize: 30 }}>New Task</Text>
        <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <View style={{ padding: 20 }}>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={(text) => this.setState({ title: text })}
          />
          <Text>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={(text) => this.setState({ description: text })}
          />
          <Rating
            ratValue={this.state.rating}
            onPressRating={(index, value) => this.setState({ rating: value })}
          />
          <TouchableOpacity
            onPress={this.saveTask}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
