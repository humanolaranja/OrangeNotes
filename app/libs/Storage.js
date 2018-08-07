import { AsyncStorage } from 'react-native';

export default class MyStorage {
  load = async () => {
    const currentData = JSON.parse(
      await AsyncStorage.getItem('storedTasks')
    );
    return (currentData == (undefined || null) ? [] : currentData);
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
    const currentData = await this.load();

    currentData.forEach((element, index, array) => {
      if(element.id === id) {
        array.splice(index, 1);
      }
    });

    await AsyncStorage.setItem('storedTasks', JSON.stringify(currentData))

    return currentData;
  }

  update = async () => {
    // TODO
  }
}
