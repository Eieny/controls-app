import { observer } from 'mobx-react-lite';
import CountryAutocompleteStore from '../../../store/country-autocomplete.state';
import useDebounce from '../../../utils/useDebounce';
import Autocomplete from '../../autocomplete/Autocomplete';
import css from './CountriesAutocomplete.module.css';

type Props = { maxOptions: number; store: CountryAutocompleteStore };

const CountriesAutocomplete = observer((props: Props) => {
  const { maxOptions, store } = props;
  const { value, countries, isPending, fetchCountryByName } = store;
  const debouncedFetch = useDebounce(fetchCountryByName);

  const handleChange = (newValue: string) => {
    store.value = newValue;
    debouncedFetch(newValue);
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      maxOptions={maxOptions}
      placeholder='Начините вводить страну...'
      options={countries}
      getOptionLabel={item => item.name}
      isBuisy={isPending}
      renderOption={item => (
        <div className={css['options-container']}>
          <img src={item.flag} />
          <span className={css['name']}>{item.name}</span>
          <span className={css['full-name']}>{item.fullName}</span>
        </div>
      )}
    />
  );
});

export default CountriesAutocomplete;
