import Todo from '../model/Todo';
import { deepCopy } from '../actions';

export default (state = { todo: [], statusOfList: 'all' }, action) => {
  const newState = deepCopy(state);
  switch (action.type) {
    case 'ComponentDidMount': {
      newState.todo = action.todos;
      return newState;
    }
    case 'add': {
      newState.todo = action.todos;
      console.log(newState.todo);
      return newState;
    }
    case 'ToggleActive': {
      newState.todo = action.todos;
      return newState;
    }
    case 'ShowFilterList': {
      newState.todo = action.todos;
      return newState;
    }
    case 'UpdateItemContent': {
      newState.todo = action.todos;
      return newState;
    }
    default:
      return state;
  }
};
