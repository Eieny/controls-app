import { useMemo } from 'react';
import Button from '../button/Button';

type ButtonItems = {
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
  onChange: () => void;

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

  return (
    <div>
      <div>{left}</div>
      <textarea value={value} onChange={onChange} />
      <div>{right}</div>
    </div>
  );
};

export default ButtonsControl;
