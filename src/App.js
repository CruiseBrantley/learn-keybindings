import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import ClassPage from "./components/classpage.js";
import axios from "axios";

import { PriestIcon, DemonHunterIcon } from "./components/abilities&icons";

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
    const classSkills = { name: [], bind: [], ability: [] };
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
          classSkills.bind.push("");
        }
      }
      for (let i = 0; i < classSkills.name.length; i++) {
        buildSkills.push({
          ability: classSkills.ability[i],
          bind: classSkills.bind[i],
          name: classSkills.name[i]
        });
      }
      console.log(buildSkills);
      this.setState({ [whichState]: buildSkills });
    });
  };

  componentDidMount = () => {
    this.getClassAbilities(hunterURL, "hunterSkills");
    this.getClassAbilities(druidURL, "druidSkills");
    this.getClassAbilities(priestURL, "priestSkills");
    this.getClassAbilities(dhURL, "dhSkills");
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
        {this.state.priestSkills !== null ? (
          <Route
            exact
            path="/priest"
            render={() => (
              <ClassPage
                wowclass="Priest"
                classIcon={PriestIcon}
                abilities={this.state.priestSkills}
              />
            )}
          />
        ) : null}
        {this.state.dhSkills !== null ? (
          <Route
            exact
            path="/demonhunter"
            render={() => (
              <ClassPage
                wowclass="Demon Hunter"
                classIcon={DemonHunterIcon}
                abilities={this.state.dhSkills}
              />
            )}
          />
        ) : null}
        {this.state.hunterSkills !== null ? (
          <Route
            exact
            path="/hunter"
            render={() => (
              <ClassPage
                wowclass="Hunter"
                classIcon={DemonHunterIcon}
                abilities={this.state.hunterSkills}
              />
            )}
          />
        ) : null}
        {this.state.druidSkills !== null ? (
          <Route
            exact
            path="/druid"
            render={() => (
              <ClassPage
                wowclass="Druid"
                classIcon={DemonHunterIcon}
                abilities={this.state.druidSkills}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
