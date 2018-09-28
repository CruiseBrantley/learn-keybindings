import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Priest from "./components/classes/priest.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="linked-list">
          <h3>
            <Link to="/priest" className="link-to-class">
              Priest
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Rogue
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Death Knight
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Shaman
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Druid
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Monk
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Demon Hunter
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Mage
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Warlock
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Hunter
            </Link>
          </h3>
        </div>
        <Route exact path="/priest" component={Priest} />
      </div>
    );
  }
}

export default App;
