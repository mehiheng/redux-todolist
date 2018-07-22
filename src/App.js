import React, { Component } from 'react';
import './App.css';
import Todo from './model/Todo';
import TodoItem from './component/TodoItem';
import classNames from 'classnames';
import todosAPI from './api/TodoResourseAPI';

export default class App extends Component {
  constructor(props) {
    super(props);
    //this.todosAPI = todosAPI;

    // this.state = {
    //   todos: [],
    //   statusOfList: Todo.ALL
    // };
  }

  componentDidMount() {
    this.props.onComponentDidMount();
  }

  add(event) {
    if (event.keyCode === 13 || event.button === 0) {
      this.props.onAdd(
        new Todo(this.refs.newItem.value),
        this.props.statusOfList
      );
      this.refs.newItem.value = '';
    }
  }

  toggleActive(viewId) {
    this.props.onToggleActive(viewId, this.props.statusOfList);
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
              console.log(this.props.todolist);
              return this.props.todolist.map(item => (
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
                href="#all"
                onClick={e => this.showFilterList(e)}
                data-filter="all"
                className={classNames({
                  selected: this.props.statusOfList === Todo.ALL
                })}
              >
                ALL
              </a>
            </li>
            <li>
              <a
                href="#active"
                onClick={e => this.showFilterList(e)}
                data-filter="active"
                className={classNames({
                  selected: this.props.statusOfList === Todo.ACTIVE
                })}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#completed"
                onClick={e => this.showFilterList(e)}
                data-filter="completed"
                className={classNames({
                  selected: this.props.statusOfList === Todo.COMPLETED
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
