import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//Pages
import MainPage from "./pages";
import ErrorPage from "./pages/error";
import LoginPage from "./pages/login";
import EventEditPage from "./pages/event-edit";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/event-edit" component={EventEditPage} />
          <Route path="/404" component={ErrorPage} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}

export default App;
