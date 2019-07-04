import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './layouts';
import Login from './pages/Login/LoginContainer';

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
      localStorage.getItem('id_token') ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
    />
  );
};

const PublicRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
      localStorage.getItem('id_token') ? (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      ) : (
        React.createElement(component, props)
      )
    )}
    />
  );
};

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/users" />} />
        <Route exact path="/app" render={() => <Redirect to="/app/users" />} />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    );
  }
}
