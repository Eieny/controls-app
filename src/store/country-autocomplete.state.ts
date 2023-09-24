import { makeAutoObservable, runInAction } from 'mobx';
import { CountryInfo, getCountryByName } from '../api/apiService';

type Status = 'pending' | 'done' | 'error';
interface Countries extends CountryInfo {
  id: number;
}

class CountryAutocompleteStore {
  private _state: Status = 'pending';
  private _countries: Array<Countries> = [];
  private _value: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get countries() {
    return this._countries;
  }

  get state() {
    return this._state;
  }

  get isPending() {
    return this._state === 'pending';
  }

  fetchCountryByName = async (str: string) => {
    this._state = 'pending';

    try {
      const countries = await getCountryByName(str);
      runInAction(() => {
        this._countries = countries.map((x, index): Countries => {
          return { ...x, id: index };
        });
        this._state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this._state = 'error';
      });
    }
  };
}

export default CountryAutocompleteStore;
