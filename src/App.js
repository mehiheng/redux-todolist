import React, { Component } from 'react';
import './App.css';
import Todo from './model/Todo';
import TodoItem from './component/TodoItem';
import classNames from 'classnames';
import todosAPI from './api/TodoResourseAPI';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    //this.todosAPI = todosAPI;

    // this.state = {
    //   todos: [],
    //   statusOfList: Todo.ALL
    // };
  }

  // componentDidMount() {
  //   this.props.onComponentDidMount();
  // }

  add(event) {
    if (event.keyCode === 13 || event.button === 0) {
      this.props.onAdd(
        new Todo(this.refs.newItem.value),
        this.props.statusOfList
      );
      this.refs.newItem.value = '';
    }
  }

  toggleActive(item) {
    this.props.onToggleActive(item, this.props.statusOfList);
  }

  showFilterList(event) {
    this.props.onShowFilterList(
      event.target.attributes.getNamedItem('data-filter').value
    );
  }

  updateItemContent(viewId, content) {
    this.props.onUpdateItemContent(viewId, content, this.props.statusOfList);
  }

  deepCopy(array) {
    return JSON.parse(JSON.stringify(array));
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
          <div className="button" onClick={e => this.add(e)}>
            Add
          </div>
        </div>
        <div>
          <ol>
            {(() => {
              return this.props.todolist.map(item => (
                <TodoItem
                  item={item}
                  key={item.viewId}
                  toggleActiveHandler={item => this.toggleActive(item)}
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
              <Link
                to="/all"
                onClick={e => this.showFilterList(e)}
                data-filter="all"
                className={classNames({
                  selected: this.props.statusOfList === Todo.ALL
                })}
              >
                ALL
              </Link>
            </li>
            <li>
              <Link
                to="/active"
                onClick={e => this.showFilterList(e)}
                data-filter="active"
                className={classNames({
                  selected: this.props.statusOfList === Todo.ACTIVE
                })}
              >
                Active
              </Link>
            </li>
            <li>
              <Link
                to="/completed"
                onClick={e => this.showFilterList(e)}
                data-filter="completed"
                className={classNames({
                  selected: this.props.statusOfList === Todo.COMPLETED
                })}
              >
                Complete
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
