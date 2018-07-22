export const componentDidMount = todos => ({
  type: 'ComponentDidMount',
  todos
});
export const add = todos => ({ type: 'add', todos });
export const toggleActive = todos => ({ type: 'ToggleActive', todos });
export const showFilterList = todos => ({ type: 'ShowFilterList', todos });
export const updateItemContent = todos => ({
  type: 'UpdateItemContent',
  todos
});
export const deepCopy = array => {
  return JSON.parse(JSON.stringify(array));
};
