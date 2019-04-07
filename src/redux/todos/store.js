import { createStore, applyMiddleware } from 'redux';
import { todoReducer } from './reducers';
import thunk from 'redux-thunk';

export const TodoStore = createStore(
    todoReducer,
    applyMiddleware(thunk)
);