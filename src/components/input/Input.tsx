import css from './Input.module.css';

type Props = {
  aRef?: React.RefObject<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
  const {  aRef, ...inputProps } = props;
  return <input {...inputProps} className={css['input']} ref={aRef} />;
};

export default Input;
