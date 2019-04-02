import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import Loading from './Loading';

function TodoItem(props) {
    const { id, title, complete } = props.todo;
    return (
        <ListGroupItem color={complete ? "secondary" : "primary"}>
            <input type="checkbox" onChange={props.markComplete(id)} className="align-self-center" /> {' '}
            {complete ? <del>{title}</del> : <span>{title}</span>}
            <Button color="danger" close={true} onClick={() => props.delTodo(id)}>
                <span className="fa fa-close text-danger"></span>
            </Button>
        </ListGroupItem>
    );
}

export class Todos extends Component {

    render() {
        if (this.props.todos) {
            return (
                <div className="row">
                    <div className="col-12">
                        <ListGroup>
                            {this.props.todos.map(todo => (
                                <TodoItem key={todo.id}
                                    todo={todo}
                                    markComplete={this.props.markComplete}
                                    delTodo={this.props.delTodo} />
                            ))}
                        </ListGroup>
                    </div>
                </div>
            )
        } else {
            return (
                <Loading />
            );
        }
    }
}

export default Todos
