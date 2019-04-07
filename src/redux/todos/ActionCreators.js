import * as AT from './ActionTypes';

// Action factories:
const newLoadTodosAction = (todos) => ({
    type: AT.LOAD_TODOS,
    payload: todos
});

export const toggleTodoAction = (id) => ({
    type: AT.TOGGLE_TODO,
    payload: id
});

const deleteTodoAction = (id) => ({
    type: AT.DELETE_TODO,
    payload: id
});

const addTodoAction = (todo) => ({
    type: AT.ADD_TODO,
    payload: todo
});

const setLoadingAction = (loading) => ({
    type: AT.SET_LOADING,
    payload: loading
})

const setErrmsgAction = (errmsg) => ({
    type: AT.SET_ERRMSG,
    payload: errmsg
})

// Thunks
export const fetchTodos = () => dispatch => {
    customFetch(dispatch,
        (todos) => {
            dispatch(newLoadTodosAction(todos));
        },
        "https://jsonplaceholder.typicode.com/todos?_limit=100");
}

export const deleteTodo = id => dispatch => {
    customFetch(dispatch,
        (() => { dispatch(deleteTodoAction(id)) }),
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
            method: "DELETE"
        })
}

export const addTodo = title => dispatch => {
    customFetch(dispatch,
        (todo) => { dispatch(addTodoAction(todo)) },
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
        });
}

// Utils:
const customFetch = (dispatch, action, ...params) => {

    dispatch(setLoadingAction(true));
    dispatch(setErrmsgAction(null));

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
        .then(() => dispatch(setLoadingAction(false)))
        .catch(error => {
            dispatch(setErrmsgAction(error.message));
        })
}
