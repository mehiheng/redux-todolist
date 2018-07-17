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

    this.state = {
      todos: this.todos,
      statusOfList: "all"
    }
  }

  add() {
    this
      .state
      .todos
      .add(new Todo(this.refs.newItem.value));
    this.setState(this.state);
    console.log(this.todos);
  }

  complete(viewId) {
    this
      .state
      .todos
      .complete(viewId);
    this.setState(this.state);
  }

  reactive(viewId) {
    this
      .state
      .todos
      .reactive(viewId);
    this.setState(this.state);
  }

  showAll() {
    console.log(this.state.todos);
    this.state.statusOfList = "all";
    this.setState(this.state);
  }

  showActive() {
    this.state.statusOfList = Todo.ACTIVE;
    this.setState(this.state);
  }

  showCompleted() {
    this.state.statusOfList = Todo.COMPLETED;
    this.setState(this.state);
  }
  updateItemContent(viewId, content) {
    this
      .state
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
            onKeyUp={e => e.keyCode == 13 && this.add()}
            id="todo-creator"
            ref="newItem"></input>
          <div className="button" onClick={e => this.add()}>Add</div>
        </div>
        <div>
          <ol>
            {(() => {
              return this
                .state
                .todos
                .filerByStatus(this.state.statusOfList)
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
