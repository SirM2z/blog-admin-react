import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import UserList from './pages/UserList';
import Account from './pages/Account';
import Login from './pages/Login/LoginContainer';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/users"
        />
        <Route
          component={UserList}
          exact
          path="/users"
        />
        <Route
          component={Account}
          exact
          path="/account"
        />
        <Route
          component={Login}
          exact
          path="/login"
        />
        <Redirect to="/users" />
      </Switch>
    );
  }
}
