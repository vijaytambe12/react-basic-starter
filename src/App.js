import React from 'react';
import './App.css';
import Header from "./component/header";
import Home from "./component/home";
import { Route, Switch } from "react-router";
import {BrowserRouter} from "react-router-dom";
import MovieDetails from "./component/movieDetails";

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
          <Switch>
              <Route exact={true} path="/" component={Home}/>
              <Route exact={true} path="/details/:id" component={MovieDetails}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
