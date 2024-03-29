import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import NotFound from "./Views/NotFound";
import Landing from "./Views/Landing";
import Signin from "./Views/Signin";
import Welcome from "./Views/Welcome";
import axios from "axios";
import { Profile } from "./Views/Profile";

const App = () => {
  const paths = [
    { path: "/", View: Landing },
    { path: "/signin", View: Signin },
    { path: "/welcome", View: Welcome },
    { path: "/profile/*", View: Profile },
    { path: "/search", View: NotFound },
  ];

  const exitTimeout = 500;

  const [error, setError] = useState(undefined);

  useEffect(() => {
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

    axios.defaults.baseURL = "https://localhost:5001";
  }, []);

  // ANIMATIONS

  const getHrefNoHash = () => {
    const {
      location: { href: locationHref },
    } = window;

    return locationHref.substring(0, locationHref.indexOf("/#"));
  };

  const GotoUrl = (url) => {
    const hrefNoHash = getHrefNoHash();

    localStorage.prevPage = hrefNoHash;

    window.location = `${hrefNoHash}/#exit`;
    setTimeout(() => (window.location = `${url}/#enter`), exitTimeout);
  };

  const ReturnToPrevUrl = () => {
    const hrefNoHash = getHrefNoHash();

    window.location = `${localStorage.prevPage}/#return`;
    localStorage.prevPage = hrefNoHash;
  };

  // END ANIMATIONS

  // AXIOS INTERCEPTS

  const requestHandler = (request) => {
    const { token } = localStorage;
    const {
      location: { pathname },
    } = window;
    const { headers } = request;
    const auth = `Bearer ${token}`;

    return token === undefined
      ? request
      : {
          ...request,
          headers: { ...headers, Authorization: auth },
        };
  };

  const responseHandler = (response) => {
    if (response.status === "401") window.location = "/signin";
    return response;
  };

  const errorHandler = (err) => {
    const {
      response: {
        data: { message },
        status,
      },
    } = err;
    if (status === "401") window.location = "/signin";
    setError(message);
    return Promise.reject(err);
  };

  axios.interceptors.request.use(requestHandler, errorHandler);
  axios.interceptors.response.use(responseHandler, errorHandler);

  // END AXIOS INTERCEPTS

  return (
    <>
      <BrowserRouter>
        <Layout exitTimeout={exitTimeout}>
          <Switch>
            {paths.map(({ path, View }) => (
              <Route key={path} exact path={path} render={() => <View />} />
            ))}
            <Route
              key={window.location.pathname}
              exact
              path={window.location.pathname}
              render={() => <NotFound />}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
