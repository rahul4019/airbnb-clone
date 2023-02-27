export const setItemsInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Cannot store in LS');
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const getItemInLocalStorage = (key) => {
  if (!key) {
    return console.error(`Cannot get value from LS`);
  }
  return localStorage.getItem(key);
};
