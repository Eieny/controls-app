import { useMemo } from 'react';
import Button from '../button/Button';

type ButtonItems = {
  text: string;
  onClick: () => void;
};

type Props = {
  text: string;
  onChange: () => void;
  leftButtons?: ButtonItems[];
  rightButtons?: ButtonItems[];
};

const mapButtons = (buttons?: ButtonItems[]) => {
  if (!buttons) return null;

  return (
    <>
      {buttons.map(({ text, onClick }) => (
        <Button onClick={onClick}>{text}</Button>
      ))}
    </>
  );
};

const ButtonsControl = (props: Props) => {
  const { leftButtons, rightButtons, text, onChange } = props;

  const left = useMemo(() => mapButtons(leftButtons), []);
  const right = useMemo(() => mapButtons(rightButtons), []);

  return (
    <div>
      <div>{left}</div>
      <textarea value={text} onChange={onChange} />
      <div>{right}</div>
    </div>
  );
};

export default ButtonsControl;
