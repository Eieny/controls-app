import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Popover from '../popover/Popover';
import PopoverItem from '../popover-item/PopoverItem';
import Input from '../input/Input';

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

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
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
  const ref = useOutsideClick(() => toggleOpen(false));
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

  const handleClickOption = (option: T) => {
    onChange(getOptionLabel(option));
    toggleOpen(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Input
        role='combobox'
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        aRef={inputRef}
      />
      {createPortal(
        <Popover
          isOpen={isOpen}
          isBuisy={isBuisy}
          innerRef={ref}
          anchorRef={inputRef}
        >
          {slicedOptions.map(option => (
            <PopoverItem
              key={option.id}
              onClick={() => handleClickOption(option)}
            >
              {renderOption(option)}
            </PopoverItem>
          ))}
        </Popover>,
        document.body
      )}
    </div>
  );
};

export default Autocomplete;
