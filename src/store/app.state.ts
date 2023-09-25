import CountryAutocompleteStore from './country-autocomplete.state';
import InputStore from './input.state';

/**
 * Основной стейт приложения.
 */
class AppState {
  private _inputStore1: InputStore;
  private _inputStore2: InputStore;
  private _autocomplete1: CountryAutocompleteStore;
  private _autocomplete2: CountryAutocompleteStore;

  constructor() {
    this._inputStore1 = new InputStore();
    this._inputStore2 = new InputStore();
    this._autocomplete1 = new CountryAutocompleteStore();
    this._autocomplete2 = new CountryAutocompleteStore();
  }

  get inputStore1() {
    return this._inputStore1;
  }
  get inputStore2() {
    return this._inputStore2;
  }
  get autocomplete1() {
    return this._autocomplete1;
  }
  get autocomplete2() {
    return this._autocomplete2;
  }
}

export default new AppState();