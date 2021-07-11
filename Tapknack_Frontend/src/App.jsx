import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Landing from './Views/Landing.jsx';

function App() {

  const paths = [
    { path: '/signin', View: undefined}
  ]
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Landing/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
