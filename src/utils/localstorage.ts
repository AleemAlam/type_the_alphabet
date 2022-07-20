export const setData = (key: string, data: string) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const getData = (key: string) => {
  const state = localStorage.getItem(key);

  return state ? JSON.parse(state) : "";
};
