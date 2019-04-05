import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import About from './components/about/About';
import TodoMain from './components/todo/TodoMain';
import Footer from './components/layout/Footer';

export const ThemeCtx = React.createContext({ bg: 'primary', text: 'danger' });

function App() {

  const todoComp = () => {
    return <TodoMain />
  }

  return (
    <BrowserRouter>
      <ThemeCtx.Provider value={{ bg: 'info', text: 'white' }}>
        <Header />
        <Switch>
          <Route exact path="/todos" component={todoComp} />
          <Route path="/about" component={About} />
          <Redirect to="/todos" />
        </Switch>
        <Footer />
      </ThemeCtx.Provider>
    </BrowserRouter>
  );
}

export default App;
