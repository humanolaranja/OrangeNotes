import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'green'
  }
})

export default class Rating extends React.Component {

  load_rating = (value) => {

    let result = [];

    for (let i = 0; i < 5; i++) {
      result.push(value > 0 ? 1 : 0);
      value --;
    }

    return result.map((val, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => this.props.onPressRating(this.props.taskIndex, i + 1)}>
          <View style={[styles.circle, val === 1 && {backgroundColor: 'green'}]}/>
        </TouchableOpacity>
      )
    });
  }

  render() {
    return (
      <View>
        {this.load_rating(this.props.ratValue)}
      </View>
    )
  }
}
