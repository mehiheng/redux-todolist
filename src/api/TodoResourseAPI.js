import Todo from '../model/Todo';

const todosAPI = {
  todos: [],
  add(item) {
    this.todos.push(item);
  },
  filerByStatus(status) {
    if (status === Todo.ALL) {
      return this.todos;
    }
    return this.todos.filter(item => item.status === status);
  },
  toggleActive(viewId) {
    let todo = this.todos.find(item => item.viewId === viewId);
    if (todo !== undefined) {
      todo.toggleActive();
    }
  },
  updateItemContent(viewId, content) {
    let todo = this.todos.find(item => item.viewId === viewId);
    if (todo !== undefined) {
      todo.content = content;
    }
  }
};
export default todosAPI;
