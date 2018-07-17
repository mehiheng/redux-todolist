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

  complete(viewId) {
    let todo = this
      .todos
      .find((item) => item.viewId === viewId);
    if (todo !== undefined) {
      todo.complete();
    }
  },

  filerByStatus(status) {
    if (status === "all") {
      return this.todos;
    }
    return this
      .todos
      .filter(item => item.status === status);
  },

  reactive(viewId) {
    let todo = this
      .todos
      .find((item) => item.viewId === viewId);
    if (todo !== undefined) {
      todo.reactive();
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

  add() {
    this
      .currentState
      .todos
      .add(new Todo(this.refs.newItem.value));
    this.setState(this.currentState);
    console.log(this.todos);
  }

  complete(viewId) {
    this
      .currentState
      .todos
      .complete(viewId);
    this.setState(this.currentState);
  }

  reactive(viewId) {
    this
      .currentState
      .todos
      .reactive(viewId);
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
            onKeyUp={e => e.keyCode === 13 && this.add()}
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
                    completeHandler={viewId => this.complete(viewId)}
                    reactiveHandler={viewId => this.reactive(viewId)}
                    updateItemContent={(viewId, content) => this.updateItemContent(viewId, content)}></TodoItem>
                ))
            })()}
          </ol>
        </div>
        <button onClick={e => this.showAll()}>all</button>
        <button onClick={e => this.showActive()}>active</button>
        <button onClick={e => this.showCompleted()}>completed</button>

      </div>
    );
  }
}

export default App;
