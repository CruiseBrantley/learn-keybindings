import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import ClassPage from "./components/classpage.js";
import axios from "axios";

import PriestIcon from "./wowiconpack/Spells/priest.png";
import DemonHunterIcon from "./wowiconpack/Spells/demonhunter.jpg";
import DruidIcon from "./wowiconpack/Spells/druid.png";
import HunterIcon from "./wowiconpack/Spells/hunter.png";

const druidURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/4/public/basic?alt=json";
const hunterURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/3/public/basic?alt=json";
const priestURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/2/public/basic?alt=json";
const dhURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/1/public/basic?alt=json";

class App extends Component {
  state = {
    hunterSkills: null,
    dhSkills: null,
    priestSkills: null,
    druidSkills: null
  };

  getClassAbilities = (classURL, whichState) => {
    const classSkills = { name: [], ability: [] };
    const buildSkills = [];

    axios.get(classURL).then(response => {
      const classSkillsList = response.data.feed.entry;
      for (let i = 3; i < classSkillsList.length; i++) {
        if (i % 2) classSkills.name.push(classSkillsList[i].content.$t);
        else {
          classSkills.ability.push(
            require("./wowiconpack/Spells/" +
              classSkillsList[i].content.$t +
              ".png")
          );
        }
      }
      for (let i = 0; i < classSkills.name.length; i++) {
        buildSkills.push({
          ability: classSkills.ability[i],
          bind: "",
          name: classSkills.name[i]
        });
      }
      console.log(buildSkills);
      this.setState({ [whichState]: buildSkills });
    });
  };

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
            <Link to="/druid" className="link-to-class">
              Druid
            </Link>
          </h3>
          <h3>
            <Link to="/priest" className="link-to-class">
              Monk
            </Link>
          </h3>
          <h3>
            <Link to="/demonhunter" className="link-to-class">
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
            <Link to="/hunter" className="link-to-class">
              Hunter
            </Link>
          </h3>
        </div>
        <Route
          exact
          path="/priest"
          render={() =>
            this.state.priestSkills !== null ? (
              <ClassPage
                wowclass="Priest"
                classIcon={PriestIcon}
                abilities={this.state.priestSkills}
              />
            ) : (
              (this.getClassAbilities(priestURL, "priestSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/demonhunter"
          render={() =>
            this.state.dhSkills !== null ? (
              <ClassPage
                wowclass="Demon Hunter"
                classIcon={DemonHunterIcon}
                abilities={this.state.dhSkills}
              />
            ) : (
              (this.getClassAbilities(dhURL, "dhSkills"), <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/hunter"
          render={() =>
            this.state.hunterSkills !== null ? (
              <ClassPage
                wowclass="Hunter"
                classIcon={HunterIcon}
                abilities={this.state.hunterSkills}
              />
            ) : (
              (this.getClassAbilities(hunterURL, "hunterSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/druid"
          render={() =>
            this.state.druidSkills !== null ? (
              <ClassPage
                wowclass="Druid"
                classIcon={DruidIcon}
                abilities={this.state.druidSkills}
              />
            ) : (
              (this.getClassAbilities(druidURL, "druidSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
      </div>
    );
  }
}

export default App;
