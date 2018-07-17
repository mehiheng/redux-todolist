import React, { Component } from 'react';
import './App.css';
import Todo from './model/Todo';
import TodoItem from './component/TodoItem';
import classNames from 'classnames';

const todosViewModel = {
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
class App extends Component {
  constructor(props) {
    super(props);
    this.todos = todosViewModel;

    this.state = {
      todos: this.todos.filerByStatus(Todo.ALL).slice(),
      statusOfList: Todo.ALL
    };
  }

  add(event) {
    if (event.keyCode === 13) {
      this.todos.add(new Todo(this.refs.newItem.value));
      const todos = this.todos.filerByStatus(this.state.statusOfList).slice();
      this.setState({ todos, statusOfList: this.state.statusOfList });
      this.refs.newItem.value = '';
      console.log(todos);
    }
  }

  toggleActive(viewId) {
    this.todos.toggleActive(viewId);
    const todos = this.todos.filerByStatus(this.state.statusOfList).slice();
    this.setState({ todos, statusOfList: this.state.statusOfList });
  }

  showFilterList(event) {
    console.log(this.state.todos);
    const statusOfList = event.target.attributes.getNamedItem('data-filter')
      .value;
    const todos = this.todos.filerByStatus(statusOfList).slice();
    this.setState({ todos, statusOfList });
  }

  updateItemContent(viewId, content) {
    this.todos.updateItemContent(viewId, content);
    const todos = this.todos.filerByStatus(this.state.statusOfList).slice();
    this.setState({ todos, statusOfList: this.state.statusOfList });
  }

  render() {
    return (
      <div className="container">
        <div>
          <h2>Jquery To Do List</h2>
          <p>
            <em>Simple Todo List with adding and filter by diff status.</em>
          </p>
        </div>
        <div>
          <input
            className="input-text"
            onKeyUp={e => this.add(e)}
            id="todo-creator"
            ref="newItem"
          />
          <div className="button" onClick={e => this.add()}>
            Add
          </div>
        </div>
        <div>
          <ol>
            {(() => {
              return this.state.todos.map(item => (
                <TodoItem
                  item={item}
                  key={item.viewId}
                  toggleActiveHandler={viewId => this.toggleActive(viewId)}
                  updateItemContent={(viewId, content) =>
                    this.updateItemContent(viewId, content)
                  }
                />
              ));
            })()}
          </ol>
        </div>
        <div>
          <ul className="filters">
            <li>
              <a
                href="#"
                onClick={e => this.showFilterList(e)}
                data-filter="all"
                className={classNames({
                  selected: this.state.statusOfList === Todo.ALL
                })}
              >
                ALL
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={e => this.showFilterList(e)}
                data-filter="active"
                className={classNames({
                  selected: this.state.statusOfList === Todo.ACTIVE
                })}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={e => this.showFilterList(e)}
                data-filter="completed"
                className={classNames({
                  selected: this.state.statusOfList === Todo.COMPLETED
                })}
              >
                Complete
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
