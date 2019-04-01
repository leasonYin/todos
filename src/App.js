import React, { Component } from 'react';
import './App.css';
import { todos } from './data/todosData';
import Todos from './components/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: todos
    }
  }

  markComplete = (id) => () => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(id === todo.id) {
          todo.complete = true;
        }
        return todo;
      })
    });
  }

  render() {
    return (
      <div>
        <Todos todos={this.state.todos} markComplete={this.markComplete} />
      </div>
    );
  }
}

export default App;
