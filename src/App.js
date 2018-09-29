import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import ClassPage from "./components/classpage.js";

import PriestIcon from "./wowiconpack/Characters and Creatures/priest.png";
import { PriestAbilities } from "./components/abilities";

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
        <Route
          exact
          path="/priest"
          render={() => (
            <ClassPage
              wowclass="Priest"
              classIcon={PriestIcon}
              abilities={PriestAbilities}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
