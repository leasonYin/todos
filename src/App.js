import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './components/About';
import AddTodo from './components/AddTodo';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  markComplete = (id) => () => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (id === todo.id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    });
  }

  delTodo(id) {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(resp => {
        console.log(resp);
        this.setState({
          todos: [
            ...this.state.todos.filter(todo => id !== todo.id)
          ]
        })
      });
  }

  addTodo(title) {

    axios.post("https://jsonplaceholder.typicode.com/todos",
      {
        title,
        complete: false
      })
      .then(resp => {
        console.log(resp);
        this.setState({
          todos: [...this.state.todos, resp.data]
        })
      });

  }

  componentDidMount() {

    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(resp => this.setState({ todos: resp.data }));

  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/home" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo.bind(this)} />
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo.bind(this)} />
            </React.Fragment>
          )} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
