import { useState } from 'react';

function useLocalStorage<T>(key?: string, initialValue?: T | null) {
  const storedValue = key ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T | null>(initial);

  const setStoredValue = (newValue: T | null) => {
    setValue(newValue);
    if (key) {
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
