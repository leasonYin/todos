import * as AT from './ActionTypes';

export const todoReducer = (
    state = {
        todos: [],
        loading: true,
        errmsg: null
    },
    action) => {
    switch (action.type) {
        case AT.LOAD_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        case AT.TOGGLE_TODO:
            return {
                ...state,
                todos: [...state.todos.map(todo => {
                    if (action.payload === todo.id) {
                        todo.complete = !todo.complete;
                    }
                    return todo;
                })]
            }
        case AT.DELETE_TODO:
            return {
                ...state,
                todos: [...state.todos.filter(todo => todo.id !== action.payload)]
            }
        case AT.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case AT.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case AT.SET_ERRMSG:
            return {
                ...state,
                errmsg: action.payload
            }
        default:
            return state;
    }
}

