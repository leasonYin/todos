import React, { useState, useEffect } from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './components/About';
import AddTodo from './components/AddTodo';
import axios from 'axios'

export const ThemeCtx = React.createContext({bg: 'primary', text: 'danger'});

function App(props) {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
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
      <ThemeCtx.Provider value={{bg: 'info', text: 'white'}}>
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
      </ThemeCtx.Provider>
    </BrowserRouter>
  );
}

export default App;
