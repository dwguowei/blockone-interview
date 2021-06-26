import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Account from "./page/Account";
import Transaction from "./page/Transaction";
import Transfer from "./page/Transfer";

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
      <div>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
