import css from './Input.module.css';

type Props = {
  /**
   * Реф на текстовое поле.
   */
  inputRef?: React.RefObject<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Текстовое поле.
 */
const Input = (props: Props) => {
  const { inputRef, ...inputProps } = props;
  return <input {...inputProps} className={css['input']} ref={inputRef} />;
};

export default Input;
