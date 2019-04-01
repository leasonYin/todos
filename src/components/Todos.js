import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

function TodoItem(props) {
    return (
        <ListGroupItem color={props.todo.complete? "secondary" : "primary"} onClick={props.markComplete(props.todo.id)}>
            {props.todo.complete? <del>{props.todo.title}</del> : <span>{props.todo.title}</span>}
        </ListGroupItem>
    );
}

export class Todos extends Component {

    render() {
        return (
            <ListGroup className="">
                {this.props.todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} />
                ))}
            </ListGroup>

        )
    }
}

export default Todos
