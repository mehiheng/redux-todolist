import Todo from '../model/Todo';
import axios from 'axios';

const todosAPI = {
  status: Todo.ALL,

  url: 'http://localhost:8080/api/todos',

  add(item, statusOfList, successCallBack) {
    axios
      .post(this.url, item)
      .then(response => {
        this.filerByStatus(statusOfList, successCallBack);
      })
      .catch(error => {
        console.log(error);
      });
  },

  filerByStatus(status, successCallBack) {
    let url = this.url;
    if (status === Todo.ALL) {
      url += '/search/statusOfTodos?status=completed,active';
    } else if (status === Todo.ACTIVE) {
      url += '/search/statusOfTodos?status=active';
    } else {
      url += '/search/statusOfTodos?status=completed';
    }
    axios
      .get(url)
      .then(response => {
        //this.todos = response.data._embedded.todos;
        //console.log(111222)
        successCallBack(response.data._embedded.todos);
      })
      .catch(error => {
        console.log(error);
      });
  },

  toggleActive(item, statusOfList, successCallBack) {
    const newStatus = item.status === 'completed' ? 'active' : 'completed';
    axios
      .patch(`//localhost:8080/api/todos/${item.id}`, { status: newStatus })
      .then(response => {
        //successCallBack(response.data._embedded.todos);
        this.filerByStatus(statusOfList, successCallBack);
      })
      .catch(error => {
        console.log(error);
      });
  },

  updateItemContent(viewId, content, statusOfList, successCallBack) {
    axios
      .patch(`//localhost:8080/api/todos/${viewId}`, { content: content })
      .then(response => {
        //successCallBack(response.data._embedded.todos)
        this.filerByStatus(statusOfList, successCallBack);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
export default todosAPI;
