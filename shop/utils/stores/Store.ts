import { Sound } from 'expo-av/build/Audio';
import { makeAutoObservable } from 'mobx';
type Mus = {
  name: string;
  track: Sound;
};
class Store {
  private _user: object = {};
  private _track: Mus | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: object) {
    this._user = user;
  }

  get user(): object {
    return this._user;
  }

   setSound(sound: Mus | null) {
    this._track = sound;
  }

  get sound(): Mus | null {
    return this._track;
  }
}

export default new Store();
