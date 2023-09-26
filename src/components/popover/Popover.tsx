import { useEffect, useRef, useState } from 'react';
import css from './Popover.module.css';

type Props = {
  isBusy?: boolean;
  isOpen?: boolean;
  children: JSX.Element[];
  /**
   * Реф на элемент-якорь.
   */
  anchorRef: React.RefObject<HTMLElement>;
  /**
   * Событие клика вне поповера.
   */
  outsideClick: () => void;
};

/**
 * Определение стилей. А именно, позиции, относительно якорного элемента
 * и минимальная ширина элемента.
 * @param anchor ссылка на элемент-якорь.
 * @returns Объект с инлайновыми стилями.
 */
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
  }, [anchor, window.innerWidth, window.innerHeight]);

  return style;
};

/**
 * Добавляет на страницу обработчик события `mousedown`.
 * Если клик происходит вне поповера, то срабатывает `callback`.
 * @param callback Функция, которая вызывается при клике вне поповера.
 * @returns Ссылка на поповер.
 */
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

/**
 * Поповер.
 */
const Popover = (props: Props) => {
  const {
    children,
    isBusy: isBuisy = false,
    isOpen = false,
    anchorRef,
    outsideClick,
  } = props;
  const style = useStyle(anchorRef);
  const ref = useOutsideClick(outsideClick);

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
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        No Options
      </div>
    );

  return (
    <ul
      role='listbox'
      className={css['list']}
      ref={ref as React.RefObject<HTMLUListElement>}
      style={style}
    >
      {children}
    </ul>
  );
};

export default Popover;
