import React, { useEffect, useState } from "react";
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

  const exitTimeout = 500;

  useEffect(() => {
    console.log("refresh - last page was ", localStorage.prevPage);

    const {
      location: { href: locationHref },
    } = window;
    const { length: locationHrefLength } = locationHref;
    const hrefNoHash = locationHref.substring(
      0,
      locationHref.includes("/#")
        ? locationHref.indexOf("/#")
        : locationHrefLength
    );

    // TODO: How do we handle changing the prev page when we do a force load on another page?
    // .. Requirements: Need to set prevPage to the current page somehow without making it loop back on itself..
    // e.g. If I'm on the landing page and I goto "Profile", prevPage needs to = "landingPage" so I return there
    // when I click the back button
    if (localStorage.prevPage === hrefNoHash)
      window.location = `${hrefNoHash}/#return`;
    else {
      console.log("set new prev page to: ", hrefNoHash);
      // localStorage.prevPage = hrefNoHash;
    }
  }, []);

  const GotoUrl = (url) => {
    const {
      location: { href: locationHref },
    } = window;
    const hrefNoHash = locationHref.substring(0, locationHref.indexOf("/#"));

    // console.log("HREF NO HASH=", hrefNoHash);

    localStorage.prevPage = hrefNoHash;

    window.location = `${hrefNoHash}/#exit`;
    setTimeout(() => (window.location = `${url}/#enter`), exitTimeout);
  };

  /* const TestTransitions = () => {
    if (window.location.pathname === "/") GotoUrl("/signin");
  }; */

  return (
    <BrowserRouter>
      <Layout /* testTransitions={TestTransitions} */ exitTimeout={exitTimeout}>
        <Switch>
          {paths.map(({ path, View }) => (
            <Route
              key={path}
              exact
              path={path}
              render={() => <View gotoUrl={GotoUrl} />}
            />
          ))}
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
