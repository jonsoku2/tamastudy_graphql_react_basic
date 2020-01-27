import React from 'react';
// router
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Posts, Post } from './components/page/Post';

const App = () => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/posts" component={Posts} />
        <Route path="/post/:id" exact component={Post} />
      </Switch>
    </Router>
  );
};

export default App;
