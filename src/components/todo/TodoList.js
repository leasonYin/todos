import React from 'react'
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function TodoList(props) {

    TodoList.propTypes = {
        todos: PropTypes.array.isRequired
    }

    const todoList = props.todos.map(todo =>
        <TodoItem key={todo.id}
            todo={todo}
            criteria={props.criteria}
            uncompleteOnly={props.uncompleteOnly}
            toggleComplete={props.toggleComplete}
            deleteTodo={props.deleteTodo} />
    );

    const errorContent = () => {
        if (props.errorMessage) {
            return (
                <div className="col-12">
                    <span className="fa fa-exclamation-triangle mr-2"></span>
                    <span className="text-danger">{props.errorMessage}</span>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div className="row">
            {errorContent()}
            <div className="col-12">
                <ListGroup>
                    {todoList}
                </ListGroup>
            </div>
        </div >
    )
}

function TodoItem({ todo, criteria, uncompleteOnly, toggleComplete, deleteTodo }) {

    if (criteria.length !== 0 && todo.title.indexOf(criteria) === -1) {
        return null;
    }

    if (uncompleteOnly && todo.complete) {
        return null;
    }

    const decoratedItem = (
        <span>
            {todo.complete ? <del>{todo.title}</del> : todo.title}
        </span>
    );

    return (
        <ListGroupItem className="bg-light">
            <input type="checkbox"
                checked={todo.complete ? 'checked' : ''}
                onChange={() => toggleComplete(todo.id)}
                className="mr-2" />
            {decoratedItem}
            <button className="close" onClick={() => deleteTodo(todo.id)}>
                &times;
            </button>
        </ListGroupItem>
    );
}

