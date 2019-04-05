import React, { Component } from 'react'
import TodoList from './TodoList';
import TodoQuery from './TodoQuery';
import AddTodo from './AddTodo';

export class TodoMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            criteria: '',
            uncompleteOnly: true,
            loading: false
        };
    }

    handleQueryInput(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked ? true : false : e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    toggleComplete(id) {
        this.setState({
            todos: [
                ...this.state.todos.map(todo => {
                    if (todo.id === id) {
                        todo.complete = !todo.complete;
                    }
                    return todo;
                })
            ]
        });
    }

    deleteTodo(id) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(resp => {
                this.setState({
                    todos: [
                        ...this.state.todos.filter(todo => todo.id !== id)
                    ]
                });
            });
    }

    addTodo(title) {
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
            .then(resp => resp.json())
            .then(todo => {
                this.setState({
                    todos: [...this.state.todos, todo]
                });
            });
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=100")
            .then(resp => resp.json())
            .then(todos => { this.setState({ todos }) })
    }

    render() {
        return (
            <div className="container">
                <AddTodo addTodo={this.addTodo.bind(this)} />
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
                <TodoQuery
                    criteria={this.state.criteria}
                    uncompleteOnly={this.state.uncompleteOnly}
                    handleQueryInput={this.handleQueryInput.bind(this)}
                />
                <TodoList todos={this.state.todos}
                    criteria={this.state.criteria}
                    uncompleteOnly={this.state.uncompleteOnly}
                    toggleComplete={this.toggleComplete.bind(this)}
                    deleteTodo={this.deleteTodo.bind(this)} />
            </div>
        )
    }
}

export default TodoMain
