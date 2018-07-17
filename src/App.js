import React, {Component} from 'react'
import './App.css'
import Todo from './model/Todo'
import TodoItem from './view/TodoItem'

const todosViewModel = {
  todos: [],
  add(item) {
    this
      .todos
      .push(item);
  },
  filerByStatus(status) {
    if (status === "all") {
      return this.todos;
    }
    return this
      .todos
      .filter(item => item.status === status);
  },
  toggleActive(viewId) {
    let todo = this
      .todos
      .find((item) => item.viewId === viewId);
    if (todo !== undefined) {
      todo.toggleActive();
    }
  },
  updateItemContent(viewId, content) {
    let todo = this
      .todos
      .find((item) => item.viewId === viewId);
    if (todo !== undefined) {
      todo.content = content;
    }
  }

}
class App extends Component {
  constructor(props) {
    super(props);
    this.todos = todosViewModel;

    this.currentState = {
      todos: this.todos,
      statusOfList: "all"
    }
  }

  add(event) {
    if (event.keyCode === 13) {
      this
        .currentState
        .todos
        .add(new Todo(this.refs.newItem.value));
      this.setState(this.currentState);
      this.refs.newItem.value = ""
      console.log(this.todos);
    }
  }

  toggleActive(viewId) {
    this
      .currentState
      .todos
      .toggleActive(viewId);
    this.setState(this.currentState);
  }

  showAll() {
    console.log(this.currentState.todos);
    this.currentState.statusOfList = "all";
    this.setState(this.currentState);
  }

  showActive() {
    this.currentState.statusOfList = Todo.ACTIVE;
    this.setState(this.currentState);
  }

  showCompleted() {
    this.currentState.statusOfList = Todo.COMPLETED;
    this.setState(this.currentState);
  }
  updateItemContent(viewId, content) {
    this
      .currentState
      .todos
      .updateItemContent(viewId, content);
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
            ref="newItem"></input>
          <div className="button" onClick={e => this.add()}>Add</div>
        </div>
        <div>
          <ol>
            {(() => {
              return this
                .currentState
                .todos
                .filerByStatus(this.currentState.statusOfList)
                .map((item) => (
                  <TodoItem
                    item={item}
                    key={item.viewId}
                    toggleActiveHandler={viewId => this.toggleActive(viewId)}
                    updateItemContent={(viewId, content) => this.updateItemContent(viewId, content)}></TodoItem>
                ))
            })()}
          </ol>
        </div>
        <div>
          <button onClick={e => this.showAll()}>all</button>
          <button onClick={e => this.showActive()}>active</button>
          <button onClick={e => this.showCompleted()}>completed</button>
        </div>

      </div>
    );
  }
}

export default App;
