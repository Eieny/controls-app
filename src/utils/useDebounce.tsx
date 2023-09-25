import { useRef } from 'react';

/**
 * Откладывает вызов `callback` на `timeout` мс.
 * @param callback Функция, которая будет вызвана по истечении времени.
 * @param timeout Время, через которое сработает `callback`. По умолчанию 400 мс.
 */
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
