import css from './Button.module.css';

type Props = {
  children: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  const { children, onClick } = props;

  return <button onClick={onClick}>{children}</button>;
};

export default Button;
