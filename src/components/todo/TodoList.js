import React from 'react'
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function TodoList(props) {

    TodoList.propTypes = {
        todos: PropTypes.array.isRequired
    }

    return (
        <div className="row">
            <div className="col-12">
                <ListGroup>
                    {
                        props.todos.map(todo => {
                            return (
                                <TodoItem key={todo.id}
                                    todo={todo}
                                    criteria={props.criteria}
                                    uncompleteOnly={props.uncompleteOnly}
                                    toggleComplete={props.toggleComplete}
                                    deleteTodo={props.deleteTodo}
                                />)
                        })
                    }
                </ListGroup>
            </div>
        </div>
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

