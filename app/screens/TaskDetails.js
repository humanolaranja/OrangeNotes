import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import MyStorage from '../libs/Storage';
import Rating from './../components/Rating';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 5
  }
})

export default class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    const task = this.props.navigation.getParam('task', {});
    this.state = ({title: task.title, description: task.description, rating: task.rating});
  }

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
    const resetPage = this.props.navigation.getParam('resetPage');
    const t = this.state.title;
    const d = this.state.description;
    const r = this.state.rating;
    const tasks = await new MyStorage().update(task.id, t, d, r);
    updateTasks(tasks);
    resetPage();
    this.props.navigation.goBack();
  }

  onPressRating = (index, value) => {
    this.setState({ rating: value });
  }

  render() {
    const task = this.props.navigation.getParam('task', {});
    const index = this.props.navigation.getParam('index', {});

    return (
      <View>
        <Card title="Caso queira, edite os dados e clique em salvar">
          <View>
          <Text>Titulo</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={this.state.title}
            onChangeText={(text) => this.setState({ title: text })}
          />
          <Text>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={this.state.description}
            onChangeText={(text) => this.setState({ description: text })}
          />
          <Rating
            taskIndex={index}
            ratValue={this.state.rating}
            onPressRating={(index, value) => this.onPressRating(index, value)}
          />
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
          name='save'
          type='font-awesome'
          color='#000'
          onPress={this.updateTest} />
      </View>
    )
  }
}
