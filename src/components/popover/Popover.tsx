import { useEffect, useState } from 'react';
import css from './Popover.module.css';

type Props = {
  isBuisy?: boolean;
  isOpen?: boolean;
  children: JSX.Element[];
  innerRef?: React.RefObject<HTMLElement>;
  anchorRef: React.RefObject<HTMLElement>;
};

const useStyle = (anchor: React.RefObject<HTMLElement>) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (anchor.current) {
      const top = anchor.current?.offsetTop;
      const left = anchor.current?.offsetLeft;
      const height = anchor.current.offsetHeight;
      const width = anchor.current.offsetWidth;

      setStyle({
        transform: `translate(${left}px, ${top + height + 5}px)`,
        minWidth: width,
      });
    }
  }, [anchor]);

  return style;
};

const Popover = (props: Props) => {
  const {
    children,
    isBuisy = false,
    isOpen = false,
    innerRef,
    anchorRef,
  } = props;
  const style = useStyle(anchorRef);

  if (!isOpen) return null;
  if (isBuisy)
    return (
      <div className={css['list_empty']} style={style}>
        Loading...
      </div>
    );
  if (children.length === 0 && !isBuisy)
    return (
      <div
        className={css['list_empty']}
        style={style}
        ref={innerRef as React.RefObject<HTMLDivElement>}
      >
        No Options
      </div>
    );

  return (
    <ul
      role='listbox'
      className={css['list']}
      ref={innerRef as React.RefObject<HTMLUListElement>}
      style={style}
    >
      {children}
    </ul>
  );
};

export default Popover;
