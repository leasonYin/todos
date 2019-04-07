import { Provider } from 'react-redux';

import React from 'react'
import TodoMain from './TodoMain';
import { TodoStore } from '../../redux/todos/store';

export default function TodoEntry() {
    return (
        <div>
            <Provider store={TodoStore}>
                <TodoMain />
            </Provider>
        </div>
    )
}
