import * as AT from './ActionTypes';

export const newLoadTodosAction = (todos) => ({
    type: AT.LOAD_TODOS,
    payload: todos
});

export const toggleTodoAction = (id) => ({
    type: AT.TOGGLE_TODO,
    payload: id
});

export const deleteTodoAction = (id) => ({
    type: AT.DELETE_TODO,
    payload: id
});

export const addTodoAction = (todo) => ({
    type: AT.ADD_TODO,
    payload: todo
});

