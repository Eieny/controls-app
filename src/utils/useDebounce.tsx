import { useRef } from 'react';

const useDebounce = <T extends Function>(
  callback: T,
  timeout: number = 400
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  return function (...args: any) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export default useDebounce;
