import { useMemo } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import css from './ButtonsControl.module.css';

export type ButtonItems = {
  /**
   * Текст кнопки.
   */
  label: string;

  /**
   * Событие клика по кнопки.
   */
  onClick: () => void;
};

type Props = {
  /**
   * Значение текстового поля.
   */
  value: string;

  /**
   * Событие изменения значения текстового поля.
   */
  onChange: (value: string) => void;

  /**
   * Кнопки слева.
   */
  leftButtons?: ButtonItems[];

  /**
   * Кнопки справа.
   */
  rightButtons?: ButtonItems[];
};

const mapButtons = (buttons?: ButtonItems[]) => {
  if (!buttons) return null;

  return (
    <>
      {buttons.map(({ label, onClick }, index) => (
        <Button key={index} onClick={onClick}>
          {label}
        </Button>
      ))}
    </>
  );
};

/**
 * Текстовый контрол с кнопками.
 */
const ButtonsControl = (props: Props) => {
  const { leftButtons, rightButtons, value, onChange } = props;

  const left = useMemo(() => mapButtons(leftButtons), []);
  const right = useMemo(() => mapButtons(rightButtons), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={css['container']}>
      <div className={css['buttons-container']}>{left}</div>
      <Input value={value} onChange={handleChange} />
      <div className={css['buttons-container']}>{right}</div>
    </div>
  );
};

export default ButtonsControl;
