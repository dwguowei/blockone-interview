import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Account from "./page/Account";
import Transaction from "./page/Transaction";
import Transfer from "./page/Transfer";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const routes = [
  {
    path: "/account/:id",
    component: Transaction
  },
  {
    path: "/transfer",
    component: Transfer
  },
  {
    path: "/",
    component: Account
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="md">
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
