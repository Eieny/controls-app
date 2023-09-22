import css from './PopupItem.module.css';

type Props = {
  id?: number;
  onClick: () => void;
  children: JSX.Element | string;
};

const PopupItem = (props: Props) => {
  const { id, children, onClick } = props;

  return (
    <li role='option' className={css['item']} onClick={onClick}>
      {children}
    </li>
  );
};

export default PopupItem;
