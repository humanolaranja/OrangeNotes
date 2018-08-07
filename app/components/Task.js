import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Rating from './Rating';

export default class Task extends React.Component {

  render() {
    const { index, task } = this.props;

    return (
      <View>
        <Text style={{fontSize: 25, paddingBottom: 5}}>{task.title}</Text>
        <Text style={{fontSize: 15, paddingBottom: 5}}>{task.description}</Text>
      <Rating
        taskIndex={index}
        ratValue={task.rating}
        onPressRating={(index, value) => this.props.onPressRating(index, value)}/>
      </View>
    )
  }
}
