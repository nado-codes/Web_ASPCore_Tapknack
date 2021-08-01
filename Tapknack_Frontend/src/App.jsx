import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import NotFound from "./Views/NotFound";
import Landing from "./Views/Landing";
import Signin from "./Views/Signin";

const App = () => {
  const paths = [
    { path: "/", View: Landing },
    { path: "/signin", View: Signin },
  ];
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {paths.map(({ path, View }) => (
            <Route key={path} exact path={path} render={() => <View />} />
          ))}
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
