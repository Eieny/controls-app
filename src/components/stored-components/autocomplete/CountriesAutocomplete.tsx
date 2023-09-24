import { observer } from 'mobx-react-lite';
import CountryAutocompleteStore from '../../../store/country-autocomplete.state';
import useDebounce from '../../../utils/useDebounce';
import Autocomplete from '../../autocomplete/Autocomplete';

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
      options={countries}
      getOptionLabel={item => item.name}
      isBuisy={isPending}
      renderOption={item => (
        <>
          <img src={item.flag} />
          <span>{item.name}</span>
          <span>{item.fullName}</span>
        </>
      )}
    />
  );
});

export default CountriesAutocomplete;
