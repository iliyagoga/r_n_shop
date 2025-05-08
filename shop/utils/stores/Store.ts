import { makeAutoObservable } from 'mobx';
class Store {
  private _user: object = {};
  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: object) {
    this._user = user;
  }

  get user(): object {
    return this._user;
  }
}

export default new Store();
