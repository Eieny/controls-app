import { makeAutoObservable } from 'mobx';

class InputStore {
  private _value = '';

  constructor() {
    makeAutoObservable(this);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

export default InputStore;
