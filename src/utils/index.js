import { useEffect, useState } from "react";
export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect((...param) => {
    callback(...param);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// export const debounce = (func, delay) => {
//   let timerout;
//   return () => {
//     if (timerout) {
//       clearTimeout(timerout);
//     }
//     timerout = setTimeout(() => {
//       func();
//     }, delay);
//   };
// };

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(new Date().getSeconds());
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debounceValue;
};
