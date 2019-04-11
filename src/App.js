import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import About from './components/about/About';
import Footer from './components/layout/Footer';
import TodoEntry from './components/todo/TodoEntry';
import HooksMain from './components/hooks/HooksMain';
import FormMain from './components/formik/FormMain';

export const ThemeCtx = React.createContext({ bg: 'primary', text: 'danger' });

function App() {

  return (
    <BrowserRouter basename="/workspace">
      <ThemeCtx.Provider value={{ bg: 'info', text: 'white' }}>
        <Header />
        <Switch>
          <Route exact path="/todos" component={TodoEntry} />
          <Route path="/about" component={About} />
          <Route path="/hooks" component={HooksMain} />
          <Route path="/formik" component={FormMain} />
          <Redirect to="/todos" />
        </Switch>
        <Footer />
      </ThemeCtx.Provider>
    </BrowserRouter>
  );
}

export default App;
