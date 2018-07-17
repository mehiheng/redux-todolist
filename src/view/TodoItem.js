import React, { Component } from 'react';
import Todo from '../model/Todo'


class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:"read"
        };
    }

    changeToEditable(){
        this.state.status = "write";
        this.setState(this.state);
    }

    updateItem(viewId, content){
        this.props.updateItemContent(viewId, content);   
        console.log(this.props.item);
        this.state.status = "read";
        this.setState(this.state);
    }

    complete(viewId){
        this.state.status = "read";
        this.setState(this.state);
        this.props.completeHandler(viewId);
    }

    reactive(viewId){
        this.state.status = "read";
        this.setState(this.state);
        this.props.reactiveHandler(viewId)
    }

    render() {
        const item = this.props.item;
        return (
            <li className={item.status} >
                <span onClick={e => this.changeToEditable(e)}>
                {this.state.status === "read" ? item.content
                    : <input defaultValue={item.content} onBlur={e => this.updateItem(item.viewId, e.currentTarget.value)}></input>}
                </span>
                {item.status === Todo.ACTIVE 
                    ? <button onClick={e => this.complete(item.viewId)}>v</button>
                    : <button onClick={e => this.reactive(item.viewId)}>r</button>}
            </li>);
    }
}


export default TodoItem;
