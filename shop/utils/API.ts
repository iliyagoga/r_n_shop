import { validator, validatorLogin } from './validator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagePickerAsset } from 'expo-image-picker';
import { router } from 'expo-router';

class API {
  private host: string = 'https://3503ecc5d460bad2.mokky.dev';
  private register: string = '/register';
  private login: string = '/auth';
  private check: string = '/auth_me';
  private users: string = '/users';
  private uploads: string = '/uploads';
  private weatherHost: string =
    'https://api.openweathermap.org/data/2.5/weather?';

  async regApi(
    name: string,
    family: string,
    login: string,
    pass: string,
    repass: string,
    file?: File | null
  ) {
    const res: object = validator(name, family, login, pass, repass, file);
    if (Object.keys(res).length == 0) {
      try {
        const response = await axios.post(this.host + this.register, {
          name,
          family,
          login,
          password: pass,
        });
        if (response) {
          AsyncStorage.setItem('token', response.data.token);
          router.push('/');
        }
      } catch (error) {
        throw error;
      }
    }
  }
  async loginApi(login: string, pass: string) {
    const res: object = validatorLogin(login, pass);
    if (Object.keys(res).length == 0) {
      try {
        const response = await axios.post(this.host + this.login, {
          login,
          password: pass,
        });
        if (response) {
          AsyncStorage.setItem('token', response.data.token);
          router.push('/');
        }
      } catch (error) {
        throw error;
      }
    }
  }

  async checkUser() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(this.host + this.check, {
        headers: { Authorization: 'Bearer ' + token },
      });
      if (res) return res.data;
    } catch (error) {
      throw error;
    }
  }

  async changeUser(
    id: string,
    name: string,
    family: string,
    login: string,
    date?: string,
    file?: File | null
  ) {
    try {
      const fileDone = await this.uploadFIle(file ?? undefined);
      const token = await AsyncStorage.getItem('token');
      const res = await axios.patch(
        this.host + this.users + '/' + id,
        {
          name,
          family,
          login,
          date,
          avatar: fileDone,
        },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      if (res) return res;
    } catch (error) {
      throw error;
    }
  }
  private async uploadFIle(file?: File) {
    try {
      if (!file || file == undefined) return '';
      const data = new FormData();

      data.append('file', file);
      const res = await axios.post(this.host + this.uploads, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res) {
        return res.data['url'];
      }
    } catch (error) {
      throw error;
    }
  }

  async getWeather(city: string) {
    try {
      const res = await axios.get(
        this.weatherHost +
          'q=' +
          city +
          '&appid=7d96008c965e4be727520a3b86d076b8&units=metric&lang=ru'
      );
      if (res) return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new API();
