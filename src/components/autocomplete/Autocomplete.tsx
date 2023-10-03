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
   * Элементы списка.
   */
  options: T[];

  /**
   * Представление элемента списка.
   */
  renderOption: (item: T) => JSX.Element;

  getOptionLabel: (item: T) => string;

  isBuisy?: boolean;
};

/**
 * Автокомплит.
 */
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, toggle] = useState(false);
  const slicedOptions =
    maxOptions && options.length > maxOptions
      ? options.slice(0, maxOptions)
      : options;

  useEffect(() => {
    if (value.length === 0) toggle(false);
  }, [value]);

  const closePopover = () => toggle(false);
  const openPopover = () => toggle(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen && e.target.value.trim()) {
      openPopover();
    }

    if (isOpen && !e.target.value.trim()) {
      closePopover();
    }

    onChange(e.target.value);
  };

  const handleFocus = () => {
    if (!value.trim()) return;
    openPopover();
  };

  const handleClickOption = (option: T) => {
    onChange(getOptionLabel(option));
    closePopover();
  };

  return (
    <div>
      <Input
        role='combobox'
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        inputRef={inputRef}
      />
      {createPortal(
        <Popover
          isOpen={isOpen}
          isBusy={isBuisy}
          anchorRef={inputRef}
          outsideClick={closePopover}
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
