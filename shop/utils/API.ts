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
  private CLIENT_ID = 'a2dbbde62935410086a8ad0cf274f032';
  private CLIENT_SECRET = '4b590046b47c421fbd4cc172ae60d837';
  private chat: string = '/chats';
  private messages: string = '/messages';
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
          email:login,
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
          email:login,
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
      if (res) {
        const ttt={...res.data}
        ttt['login']=ttt['email']
        return ttt
      };
    } catch (error) {
      return {}
    }
  }
  async getUsers() {
    try {
      const res = await axios.get(this.host + this.users);
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
          email:login,
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
  async getChats(userId: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(this.host + this.chat,{
        headers: { Authorization: 'Bearer ' + token },
      });
      res.data=res.data.filter((chat:any)=>chat.user_id==userId || chat.user2_id==userId);
      for (const chat of res.data) {
        const messages = await axios.get(this.host + this.messages + '?chat_id=' + chat.id +'&sortBy=-id',{
          headers: { Authorization: 'Bearer ' + token },
        });
        chat['messages'] = messages.data[0];
        const user = await axios.get(this.host + this.users + '/' + chat.user2_id,{
          headers: { Authorization: 'Bearer ' + token },
        });
        chat['user'] = user.data;
      }
      
      if (res) return res.data;
    } catch (error) {
      return []
    }
  }
  async getChat(chatId: string |string[],userId: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(this.host + this.chat + '/' + chatId,{
        headers: { Authorization: 'Bearer ' + token },
      });
      const user = await axios.get(this.host + this.users + '/' + (userId!==res.data.user2_id ? res.data.user2_id : res.data.user_id),{
        headers: { Authorization: 'Bearer ' + token },
      });
      res.data['user'] = user.data;
      if (res) return res.data;
    } catch (error) {
      return {}
    }
  }
  async sendMessage(chatId: string |string[], text: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(this.host + this.messages, {
        chat_id: chatId,
        text,
      }, {
        headers: { Authorization: 'Bearer ' + token },
      });
      if (res) return res.data;
    } catch (error) {
      return []
    }
  }
  async createChat(userId: string, user2Id: string) {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(this.host + this.chat, {
        user_id: userId,
        user2_id: user2Id,
      }, {
        headers: { Authorization: 'Bearer ' + token },
      });
      
      if (res) return res.data;
    } catch (error) {
      return {}
    }
  }
  async getMessages(chatId: string |string[]) {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(this.host + this.messages + '?chat_id=' + chatId,{
        headers: { Authorization: 'Bearer ' + token },
      });
      if (res) return res.data;
    } catch (error) {
      return []
    }
  }
}

export default new API();
