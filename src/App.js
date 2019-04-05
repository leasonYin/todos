import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route } from 'react-router-dom';
import About from './components/about/About';
import TodoMain from './components/todo/TodoMain';
import Footer from './components/layout/Footer';

export const ThemeCtx = React.createContext({ bg: 'primary', text: 'danger' });

function App(props) {

  return (
    <BrowserRouter>
      <ThemeCtx.Provider value={{ bg: 'info', text: 'white' }}>
        <Header />
        <Route exact path="/home" component={TodoMain} />
        <Route path="/about" component={About} />
        <Footer />
      </ThemeCtx.Provider>
    </BrowserRouter>
  );
}

export default App;
