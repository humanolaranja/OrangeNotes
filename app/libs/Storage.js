import { AsyncStorage } from 'react-native';

export default class MyStorage {
  load = async (page_number) => {
    const currentData = JSON.parse(
      await AsyncStorage.getItem('storedTasks')
    );
    if(page_number > 0) {
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

  update = async (id, title) => {
    const currentData = await this.load(-1);

    currentData.forEach((element, index, array) => {
      if(element.id === id) {
        element.title = title;
      }
    });

    await AsyncStorage.setItem('storedTasks', JSON.stringify(currentData))

    return currentData;
  }
}
