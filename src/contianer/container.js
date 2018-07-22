import { connect } from 'react-redux';
import App from '../App';
import todosAPI from '../api/TodoResourseAPI';
import {
  showFilterList,
  deepCopy,
  add,
  updateItemContent,
  toggleActive,
  componentDidMount
} from '../actions';
import Todo from '../model/Todo';

const mapStateToProps = state => {
  return {
    todolist: state.todo, //reducer里的state的todo，todolist是传给App的TodoItem的todolist
    statusOfList: state.statusOfList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (todo, statusOfList) => {
      todosAPI.add(todo);
      const todos = deepCopy(todosAPI.filerByStatus(statusOfList));
      dispatch(add(todos));
    },
    onShowFilterList: statusOfList => {
      console.log('2222' + statusOfList);
      const todos = deepCopy(todosAPI.filerByStatus(statusOfList));
      console.log('12312312=' + todos);
      dispatch(showFilterList(todos));
    },
    onUpdateItemContent: (viewId, content, statusOfList) => {
      todosAPI.updateItemContent(viewId, content);
      const todos = deepCopy(todosAPI.filerByStatus(statusOfList));
      dispatch(updateItemContent(todos));
    },
    onToggleActive: (viewId, statusOfList) => {
      todosAPI.toggleActive(viewId);
      const todos = deepCopy(todosAPI.filerByStatus(statusOfList));
      dispatch(toggleActive(todos));
    },
    onComponentDidMount: () => {
      const todos = deepCopy(todosAPI.filerByStatus(Todo.ALL));
      dispatch(componentDidMount(todos));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
