import { AsyncStorage } from 'react-native';

export default class MyStorage {
  load = async (page_number, query = '') => {
    const currentData = JSON.parse(
      await AsyncStorage.getItem('storedTasks')
    );
    const filtered = [];
    if(query != '') {
      currentData.forEach((element, index, array) => {
        const search = element.title.toLowerCase();
        if(search.indexOf(query) > -1) {
          if(filtered.indexOf(query) < 0) {
            filtered.push(element);
          }
        }
      });
      return (filtered == (undefined || null) ? [] : filtered);
    }
    else if(page_number > 0) {
      page_size = 15;
      --page_number;
      var newData = currentData.slice(page_number * page_size, (page_number + 1) * page_size);
      return (newData == (undefined || null) ? [] : newData);
    }
    else {
      return (currentData == (undefined || null) ? [] : currentData);
    }
  }

  add = async (data) => {
    const currentData = await this.load();

    const newData = {
      id: currentData.length > 0 ?
        (currentData[currentData.length-1].id + 1) :
        1,
      title: data.title,
      description: data.description,
      rating: data.rating
    }

    currentData.push(newData);

    await AsyncStorage.setItem('storedTasks', JSON.stringify(currentData));

    return newData;
  }

  destroy = async (id) => {
    const currentData = await this.load(-1);

    currentData.forEach((element, index, array) => {
      if(element.id === id) {
        array.splice(index, 1);
      }
    });

    await AsyncStorage.setItem('storedTasks', JSON.stringify(currentData))

    return currentData;
  }

  update = async (id, title, description, rating) => {
    const currentData = await this.load(-1);

    currentData.forEach((element, index, array) => {
      if(element.id === id) {
        element.title = title;
        element.description = description;
        element.rating = rating;
      }
    });

    await AsyncStorage.setItem('storedTasks', JSON.stringify(currentData))

    return currentData;
  }
}
