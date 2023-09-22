import { useState } from 'react';
import Popup from '../popup/Popup';
import PopupItem from '../popup-item/PopupItem';

type Props<T> = {
  /**
   * Значение текстового поля.
   */
  value: string;

  /**
   * Событие изменения значения текстового поля.
   */
  onChange: (value: string) => void;

  /**
   * Максимальное количество отображаемых подсказок.
   */
  maxOptions?: number;

  /**
   * Плейсхолдер.
   */
  placeholder?: string;

  /**
   *
   */
  options: T[];

  renderOption: (item: T) => JSX.Element;

  getOptionLabel: (item: T) => string;

  isBuisy?: boolean;
};

const Autocomplete = <T extends { id: number }>(props: Props<T>) => {
  const {
    value,
    onChange,
    placeholder,
    maxOptions,
    options,
    renderOption,
    getOptionLabel,
    isBuisy = false,
  } = props;
  const [isOpen, toggleOpen] = useState(false);
  const slicedOptions =
    maxOptions && options.length > maxOptions
      ? options.slice(0, maxOptions)
      : options;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen && e.target.value.trim()) {
      toggleOpen(true);
    }

    if (isOpen && !e.target.value.trim()) {
      toggleOpen(false);
    }

    onChange(e.target.value);
  };

  const handleFocus = () => {
    if (!value.trim()) return;
    toggleOpen(true);
  };

  const handleBlur = () => {
    toggleOpen(false);
  };

  const handleClickOption = (option: T) => {
    console.log(option);
    onChange(getOptionLabel(option));
    toggleOpen(false);
  };

  return (
    <div>
      <input
        role='combobox'
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        // onBlur={handleBlur}
        placeholder={placeholder}
      />
      <Popup isOpen={isOpen} isBuisy={isBuisy}>
        {slicedOptions.map(option => (
          <PopupItem
            key={option.id}
            id={option.id}
            onClick={() => handleClickOption(option)}
          >
            {renderOption(option)}
          </PopupItem>
        ))}
      </Popup>
    </div>
  );
};

export default Autocomplete;
