import { useEffect, useState } from "react";

const getStoredValues = <T>(key: string, defaultValue: T): T => {
    const savedItems = localStorage.getItem(key);
    if (savedItems) {
      return JSON.parse(savedItems);
    }
    return defaultValue;
  };

  export const useLocalStorage = <T,>( key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState(() => {
      return getStoredValues(key, defaultValue);
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  };