import * as AT from './ActionTypes';

export const todoReducer = (
    state = {
        todos: []
    },
    action) => {
    switch (action.type) {
        case AT.LOAD_TODOS:
            return {
                todos: action.payload
            }
        case AT.TOGGLE_TODO:
            return {
                todos: [...state.todos.map(todo => {
                    if (action.payload === todo.id) {
                        todo.complete = !todo.complete;
                    }
                    return todo;
                })]
            }
        case AT.DELETE_TODO:
            return {
                todos: [...state.todos.filter(todo => todo.id !== action.payload)]
            }
        case AT.ADD_TODO:
            return {
                todos: [...state.todos, action.payload]
            }
        default:
            return state;
    }
}

