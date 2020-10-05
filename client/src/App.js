import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Pages
import MainPage from "./pages";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";

class App extends React.Component {
  state = {
    data: null
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/404">
            <ErrorPage />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
