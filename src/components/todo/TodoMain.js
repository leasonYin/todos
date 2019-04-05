import React, { useState, useEffect } from 'react'
import TodoList from './TodoList';
import TodoQuery from './TodoQuery';
import AddTodo from './AddTodo';

export function TodoMain(props) {

    const [todos, setTodos] = useState([]);
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
        setTodos([
            ...todos.map(todo => {
                if (todo.id === id) {
                    todo.complete = !todo.complete;
                }
                return todo;
            })
        ]);
    }

    const deleteTodo = (id) => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
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
            .then(resp => {
                setTodos([...todos.filter(todo => todo.id !== id)])
            })
            .then(() => { setLoading(false) })
            .then(() => { setErrorMessage(null) })
            .catch(error => {
                setErrorMessage(error.message);
            })
    }

    const addTodo = (title) => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/todos",
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
            .then(todo => {
                setTodos([...todos, todo]);
            })
            .then(() => setLoading(false))
            .then(() => setErrorMessage(null))
            .catch(error => {
                setErrorMessage(error.message);
            })
    }

    useEffect(() => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=100")
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
            .then(todos => { setTodos(todos) })
            .then(() => setLoading(false))
            .catch(error => {
                setErrorMessage(error.message);
            })

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
            <TodoList todos={todos}
                criteria={criteria}
                uncompleteOnly={uncompleteOnly}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                errorMessage={errorMessage} />
        </div>
    )
}

export default TodoMain
