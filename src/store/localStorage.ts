const KEY = "redux";
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = async (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (error) {
    console.log(error);
  }
};
