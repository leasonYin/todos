import React, { useState, useEffect } from 'react'
import TodoList from './TodoList';
import TodoQuery from './TodoQuery';
import AddTodo from './AddTodo';
import { connect } from 'react-redux';
import { toggleTodoAction, fetchTodos, deleteTodo, addTodo } from '../../redux/todos/ActionCreators';

const mapStateToProps = state => ({
    todos: state.todos,
    loading: state.loading,
    errmsg: state.errmsg
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleTodo: (id) => dispatch(toggleTodoAction(id)),       
        fetchTodos: () => dispatch(fetchTodos()),
        addTodo: (title) => dispatch(addTodo(title)),
        deleteTodo: (id) => dispatch(deleteTodo(id))
    }
};

function TodoMain(props) {

    const [criteria, setCriteria] = useState('');
    const [uncompleteOnly, setUncompleteOnly] = useState(false);

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

    useEffect(() => {
        props.fetchTodos();
    }, [])

    return (
        <div className="container">
            <AddTodo addTodo={props.addTodo} />
            <div className="row">
                <div className="col-12">
                    <hr />
                </div>
            </div>
            <TodoQuery
                criteria={criteria}
                uncompleteOnly={uncompleteOnly}
                handleQueryInput={handleQueryInput}
                loading={props.loading} />
            <TodoList todos={props.todos}
                criteria={criteria}
                uncompleteOnly={uncompleteOnly}
                toggleComplete={toggleComplete}
                deleteTodo={props.deleteTodo}
                errorMessage={props.errmsg} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoMain);
