import React, { useState, useEffect } from 'react'
import TodoList from './TodoList';
import TodoQuery from './TodoQuery';
import AddTodo from './AddTodo';
import { connect } from 'react-redux';
import { newLoadTodosAction, toggleTodoAction, deleteTodoAction, addTodoAction } from '../../redux/todos/ActionCreators';

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => {
    return {
        loadTodosFromNet: todos => dispatch(newLoadTodosAction(todos)),
        toggleTodo: (id) => dispatch(toggleTodoAction(id)),
        deleteTodo: (id) => dispatch(deleteTodoAction(id)),
        addTodo: (todo) => dispatch(addTodoAction(todo))
    }
};

function TodoMain(props) {

    const [criteria, setCriteria] = useState('');
    const [uncompleteOnly, setUncompleteOnly] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleQueryInput = (e) => {
        const name = e.target.name;
        if (name === "criteria") {
            setCriteria(e.target.value);
        } else if (name === "uncompleteOnly") {
            setUncompleteOnly(e.target.checked ? true : false);
        }
    }

    const toggleComplete = (id) => {
        props.toggleTodo(id);
    }

    const customFetch = (action, ...params) => {

        setLoading(true);
        fetch(...params)
            .then(resp => {
                if (resp.ok) {
                    return resp;
                } else {
                    let err = new Error('Error: ' + resp.status);
                    err.response = resp;
                    throw err;
                }
            }, error => {
                throw error;
            })
            .then(resp => resp.json())
            .then(jsonData => { action(jsonData) })
            .then(() => setLoading(false))
            .catch(error => {
                setErrorMessage(error.message);
            })
    }

    const deleteTodo = (id) => {
        customFetch(
            (data => { props.deleteTodo(id) }),
            `https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                method: "DELETE"
            })
    }

    const addTodo = (title) => {
        customFetch(
            todo => { props.addTodo(todo) },
            "https://jsonplaceholder.typicode.com/todos",
            {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    complete: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
    }

    useEffect(() => {
        customFetch(
            (todos) => {
                props.loadTodosFromNet(todos);
            },
            "https://jsonplaceholder.typicode.com/todos?_limit=100"
        );
    }, [])

    return (
        <div className="container">
            <AddTodo addTodo={addTodo} />
            <div className="row">
                <div className="col-12">
                    <hr />
                </div>
            </div>
            <TodoQuery
                criteria={criteria}
                uncompleteOnly={uncompleteOnly}
                handleQueryInput={handleQueryInput}
                loading={loading} />
            <TodoList todos={props.todos}
                criteria={criteria}
                uncompleteOnly={uncompleteOnly}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                errorMessage={errorMessage} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoMain);
