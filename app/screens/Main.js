import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Button, List, ListItem, SearchBar } from 'react-native-elements';
import MyStorage from '../libs/Storage';
import _ from 'lodash';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      query: '',
      fullData: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    const { query } = this.state;
    this.setState({ loading: true });

    const tasks = new MyStorage().load(page, query)
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
    if(this.state.query == ''){
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.makeRemoteRequest();
        }
      );
    }
  };

  handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    if(formatQuery == ''){
      this.setState({ page: 1 });
      this.makeRemoteRequest();
    }
    else {
      this.setState({ query: formatQuery });
      this.makeRemoteRequest();
    }
  }

  updateTasks = (tasks) => {
    this.setState({ data: tasks });
  }

  appendToTasks = (task) => {
    const tasks = this.state.data;
    tasks.push(task);
    this.updateTasks(tasks);
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Buscar..." lightTheme round onChangeText={this.handleSearch} />;
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
      onPress={() => this.props.navigation.navigate('NewTask', {updateTasks: this.updateTasks})}
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
