import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import ClassPage from "./components/classpage.js";
import axios from "axios";

import PriestIcon from "./wowiconpack/Spells/priest.png";
import DemonHunterIcon from "./wowiconpack/Spells/demonhunter.jpg";
import DruidIcon from "./wowiconpack/Spells/druid.png";
import HunterIcon from "./wowiconpack/Spells/hunter.png";
import ShamanIcon from "./wowiconpack/Spells/shaman.png";
import WarlockIcon from "./wowiconpack/Spells/warlock.png";
import RogueIcon from "./wowiconpack/Spells/rogue.png";

const rogueURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/7/public/basic?alt=json";
const warlockURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/6/public/basic?alt=json";
const shamanURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/5/public/basic?alt=json";
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
    druidSkills: null,
    shamanSkills: null,
    warlockSkills: null,
    rogueSkills: null
  };

  getClassAbilities = (classURL, whichState) => {
    axios.get(classURL).then(response => {
      const classSkillsList = response.data.feed.entry;
      const buildSkills = [];
      let newSkill = {};
      for (let i = 3; i < classSkillsList.length; i++) {
        if (i % 2) {
          newSkill = { ability: "", bind: "", name: "" };
          newSkill.name = classSkillsList[i].content.$t;
        } else {
          newSkill.ability = require("./wowiconpack/Spells/" +
            classSkillsList[i].content.$t +
            ".png");
          buildSkills.push(newSkill);
        }
      }
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
            <Link to="/rogue" className="link-to-class">
              Rogue
            </Link>
          </h3>
          {/* <h3>
            <Link to="/priest" className="link-to-class">
              Death Knight
            </Link>
          </h3> */}
          <h3>
            <Link to="/shaman" className="link-to-class">
              Shaman
            </Link>
          </h3>
          <h3>
            <Link to="/druid" className="link-to-class">
              Druid
            </Link>
          </h3>
          {/* <h3>
            <Link to="/priest" className="link-to-class">
              Monk
            </Link>
          </h3> */}
          <h3>
            <Link to="/demonhunter" className="link-to-class">
              Demon Hunter
            </Link>
          </h3>
          {/* <h3>
            <Link to="/priest" className="link-to-class">
              Mage
            </Link>
          </h3> */}
          <h3>
            <Link to="/warlock" className="link-to-class">
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
        <Route
          exact
          path="/shaman"
          render={() =>
            this.state.shamanSkills !== null ? (
              <ClassPage
                wowclass="Shaman"
                classIcon={ShamanIcon}
                abilities={this.state.shamanSkills}
              />
            ) : (
              (this.getClassAbilities(shamanURL, "shamanSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/warlock"
          render={() =>
            this.state.warlockSkills !== null ? (
              <ClassPage
                wowclass="Warlock"
                classIcon={WarlockIcon}
                abilities={this.state.warlockSkills}
              />
            ) : (
              (this.getClassAbilities(warlockURL, "warlockSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/rogue"
          render={() =>
            this.state.rogueSkills !== null ? (
              <ClassPage
                wowclass="Rogue"
                classIcon={RogueIcon}
                abilities={this.state.rogueSkills}
              />
            ) : (
              (this.getClassAbilities(rogueURL, "rogueSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
      </div>
    );
  }
}

export default App;
