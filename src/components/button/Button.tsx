import css from './Button.module.css';

type Props = {
  /**
   * Клик по кнопке.
   */
  onClick: () => void;

  /**
   * Содержимое кнопки.
   */
  children: string;
};

/**
 * Кнопка.
 */
const Button = (props: Props) => {
  const { children, onClick } = props;

  return (
    <button className={css['button']} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
