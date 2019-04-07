import { connect } from 'react-redux';
import { createStore } from 'redux';
import { todoReducer } from './reducers';

export const TodoStore = createStore(todoReducer, { todos: [] });