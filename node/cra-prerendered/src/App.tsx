import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import IndexPage from './pages'
import TestPage from './pages/test'
import NotFoundPage from './pages/404'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route exact path="/test">
          <TestPage />
        </Route>
        <NotFoundPage />
      </Switch>
    </BrowserRouter>
  )
}

export default App
