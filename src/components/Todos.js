import React from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
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

export function Todos({ todos, markComplete, delTodo }) {
    if (todos.length > 0) {
        return (
            <div className="row">
                <div className="col-12 rounded-0">
                    <ListGroup >
                        {todos.map(todo => (
                            <TodoItem key={todo.id}
                                todo={todo}
                                markComplete={markComplete}
                                delTodo={delTodo} />
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

export default Todos
