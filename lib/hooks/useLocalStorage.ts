import React from "react";

const getStorageValue = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") {
    return;
  }

  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : undefined;

  return initial || defaultValue;
};

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = React.useState(() => {
    return getStorageValue(key, defaultValue);
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
