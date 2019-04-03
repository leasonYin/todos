import React, { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './components/About';
import AddTodo from './components/AddTodo';
import axios from 'axios'

function App(props) {

  const [todos, setTodos] = useState([]);

  useLayoutEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(resp => setTodos([...resp.data]));
  }, []);

  const markComplete = (id) => () => {
    setTodos([
      ...todos.map(todo => {
        if (id === todo.id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    ]);
  }

  const delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(resp => {
        setTodos([
          ...todos.filter(todo => id !== todo.id)
        ])
      })
  }



  const addTodo = (title) => {

    axios.post("https://jsonplaceholder.typicode.com/todos",
      {
        title,
        complete: false
      })
      .then(resp => {
        console.log(resp);
        setTodos(
          [...todos, resp.data]
        )
      });

  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route exact path="/home" render={props => (
          <React.Fragment>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} markComplete={markComplete} delTodo={delTodo} />
          </React.Fragment>
        )} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

export default App;
