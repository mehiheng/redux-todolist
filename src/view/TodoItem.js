import React, {Component} from 'react';
import Todo from '../model/Todo'
import '../App.css'

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.currentState = {
            status: "read"
        };
    }

    changeToEditable() {
        this.currentState.status = "write"
        this.setState(this.currentState)
    }

    updateItem(e, viewId, content) {
        if (e.keyCode === 13) {
            this.props
                .updateItemContent(viewId, content);
            console.log(this.props.item);
            this.currentState.status = "read"
            this.setState(this.currentState)
        }
    }

    toggleActive(viewId) {
        this.currentState.status = "read"
        this.setState(this.currentState)
        this
            .props
            .toggleActiveHandler(viewId)
    }

    render() {
        const item = this.props.item;
        return (
            <li className={item.status}>
            {
                <input type="checkbox" className="done-todo" defaultChecked={item.status === Todo.COMPLETED} onClick={e => this.toggleActive(item.viewId)}/> 
            }
                <span onDoubleClick={e => this.changeToEditable(e)}>
                    {this.currentState.status === "read"
                        ? item.content
                        : <input autoFocus
                            defaultValue={item.content}
                            onKeyUp={e => this.updateItem(e, item.viewId, e.currentTarget.value)}></input>}
                </span>
            </li>
        );
    }
}

export default TodoItem;
