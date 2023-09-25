import css from './PopoverItem.module.css';

type Props = {
  /**
   * Событие клика по элементу поповера.
   */
  onClick: () => void;
  children: JSX.Element | string;
};

/**
 * Элемент поповера.
 */
const PopoverItem = (props: Props) => {
  const { children, onClick } = props;

  return (
    <li role='option' className={css['item']} onClick={onClick} tabIndex={1}>
      {children}
    </li>
  );
};

export default PopoverItem;
