import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Button, List, ListItem, SearchBar } from 'react-native-elements';
import MyStorage from '../libs/Storage';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    this.setState({ loading: true });

    const tasks = new MyStorage().load(page)
      .then(res => {
        this.setState({
          data: page === 1 ? res : [...this.state.data, ...res],
          error: res.error || null,
          loading: false,
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error, loading: false });
      });
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  updateTasks = (tasks) => {
    this.setState({ data: tasks });
  }

  appendToTasks = (task) => {
    const tasks = this.state.data;
    tasks.push(task);
    this.setState({ data: tasks });
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

  renderHeader = () => {
    return <SearchBar placeholder="Buscar..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={[{flex:1, paddingBottom: 75}]}>
      <Button
      small
      buttonStyle={{marginTop:20, backgroundColor: '#EE7600'}}
      onPress={() => this.props.navigation.navigate('NewTask', {appendToTasks: this.appendToTasks})}
      icon={{name: 'plus', type: 'font-awesome'}}
      title='Nova Nota' />
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.props.navigation.navigate('TaskDetails', {
                task: item,
                updateTasks: this.updateTasks
              })}
            />
          )}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
        />
      </List>
      </View>
    );
  }
}
