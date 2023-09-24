import css from './PopoverItem.module.css';

type Props = {
  onClick: () => void;
  children: JSX.Element | string;
  isSelected?: boolean;
};

const PopoverItem = (props: Props) => {
  const { children, onClick } = props;

  return (
    <li role='option' className={css['item']} onClick={onClick} tabIndex={1}>
      {children}
    </li>
  );
};

export default PopoverItem;
