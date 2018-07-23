import { connect } from 'react-redux';
import App from '../App';
import todosAPI from '../api/TodoResourseAPI';
import {
  showFilterList,
  deepCopy,
  add,
  updateItemContent,
  toggleActive
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
      todosAPI.add(todo, statusOfList, todos => dispatch(add(todos)));
    },

    onShowFilterList: statusOfList => {
      todosAPI.filerByStatus(statusOfList, todos =>
        dispatch(showFilterList(todos))
      );
    },

    onUpdateItemContent: (viewId, content, statusOfList) => {
      todosAPI.updateItemContent(viewId, content, statusOfList, todos =>
        dispatch(updateItemContent(todos))
      );
    },

    onToggleActive: (item, statusOfList) => {
      console.log('toggler' + item);
      todosAPI.toggleActive(item, statusOfList, todos =>
        dispatch(toggleActive(todos))
      );
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
