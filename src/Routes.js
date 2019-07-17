import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { USER_TOKEN } from './constant';
import { getLS } from './utils';
import Layout from './layouts';
import Login from './pages/Login';
import Users from './pages/UserList';

function NoMatch({location}) {
  return (<h3>
    No match for <code>{location.pathname}</code>
  </h3>);
}

const pageRoutes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/app",
    component: Layout,
    routes: [
      {
        path: "/app",
        redirect: "/app/users"
      },
      {
        path: "/app/users",
        auth: true,
        component: Users
      },
      {
        component: NoMatch
      }
    ]
  },
  {
    component: NoMatch
  }
]

function RouteWithSubRoutes(route, i) {
  const uniqueKey = route.path || i;
  if (route.redirect) {
    return (
      <Redirect key={uniqueKey + '-redirect'} exact from={route.path} to={route.redirect} />
    )
  } else {
    return (
      <Route
        key={uniqueKey}
        exact={!route.routes}
        path={route.path}
        render={props => {
          // pass the sub-routes down to keep nesting
          if (route.auth) {
            if (getLS(USER_TOKEN)) {
              return <route.component key={uniqueKey} {...props} routes={route.routes} />
            } else {
              return <Redirect to={{
                pathname: '/login',
                state: {
                  from: route.path
                }
              }} />
            }
          } else {
            return <route.component key={uniqueKey} {...props} routes={route.routes} />
          }
        }}
      />
    );
  }
}

export default function Routes({routes}) {
  const currentRoutes = routes || pageRoutes;
  return (
    <Switch>
      {currentRoutes.map((route, i) => RouteWithSubRoutes(route, i))}
    </Switch>
  )
}
