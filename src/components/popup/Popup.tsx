import css from './Popup.module.css';

type Props = {
  isBuisy?: boolean;
  isOpen?: boolean;
  children?: JSX.Element | JSX.Element[];
};

const Popup = (props: Props) => {
  const { children, isBuisy = false, isOpen = false } = props;

  if (!isOpen) return null;
  if (isBuisy) return <div>Loading...</div>;
  if (!children) return <div>No Options</div>;

  return (
    <ul role='listbox' className={css['list']}>
      {children}
    </ul>
  );
};

export default Popup;
