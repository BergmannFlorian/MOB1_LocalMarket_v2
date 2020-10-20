import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export function useUserContainer() {
  let [tokken, setTokken] = useState('');

  async function refreshTokken() {
    let value = await AsyncStorage.getItem('token');
    if (value) {
      setTokken(value);
      return;
    }
    setTokken(false);
  }

  async function login(values) {
    axios
      .get('/api/me', {
        headers: {Authorization: 'Bearer ' + values.token},
      })
      .then(async () => {
        try {
          await AsyncStorage.setItem('token', values.token);
          this.refreshTokken();
        } catch (e) {}
      })
      .catch(error => console.log(error));
  }

  function deleteToken(){
    AsyncStorage.setItem('token','');
  }
  return {tokken, setTokken, refreshTokken, login,deleteToken};
}
