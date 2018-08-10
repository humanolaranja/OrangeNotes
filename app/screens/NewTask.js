import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import Rating from '../components/Rating';
import MyStorage from '../libs/Storage';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 5
  }
})

export default class NewTask extends React.Component {

  static navigationOptions = {
    title: 'Nova Nota',
  };

  state = {
    title: '',
    description: '',
    rating: 1
  }

  saveTask = async () => {
    const task = this.state;
    const savedTask = await new MyStorage().add(task);
    const updateTasks = this.props.navigation.getParam('updateTasks');
    const tasks = await new MyStorage().load(1);
    updateTasks(tasks);
    this.props.navigation.goBack();
  }

  render () {
    return (
      <View>
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
          <Icon
            raised
            name='save'
            type='font-awesome'
            color='#000'
            onPress={this.saveTask} />
        </View>
      </View>
    )
  }
}
