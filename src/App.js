import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import ClassPage from "./components/classpage.js";
import axios from "axios";
// import { google } from "googleapis";

import PriestIcon from "./wowiconpack/Spells/priest.png";
import DemonHunterIcon from "./wowiconpack/Spells/demonhunter.jpg";
import DruidIcon from "./wowiconpack/Spells/druid.png";
import HunterIcon from "./wowiconpack/Spells/hunter.png";
import ShamanIcon from "./wowiconpack/Spells/shaman.png";
import WarlockIcon from "./wowiconpack/Spells/warlock.png";
import RogueIcon from "./wowiconpack/Spells/rogue.png";
import PaladinIcon from "./wowiconpack/Spells/paladin.png";
import WarriorIcon from "./wowiconpack/Spells/warrior.png";
import MonkIcon from "./wowiconpack/Spells/monk.jpg";
import MageIcon from "./wowiconpack/Spells/mage.png";
import DeathKnightIcon from "./wowiconpack/Spells/deathknight.jpg";

const mageURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/12/public/basic?alt=json";
const deathknightURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/11/public/basic?alt=json";
const warriorURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/10/public/basic?alt=json";
const paladinURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/9/public/basic?alt=json";
const monkURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/8/public/basic?alt=json";
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
const demonhunterURL =
  "https://spreadsheets.google.com/feeds/cells/1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo/1/public/basic?alt=json";

class App extends Component {
  state = {
    hunterSkills: null,
    demonhunterSkills: null,
    priestSkills: null,
    druidSkills: null,
    shamanSkills: null,
    warlockSkills: null,
    rogueSkills: null,
    monkSkills: null,
    paladinSkills: null,
    warriorSkills: null,
    mageSkills: null,
    deathknightSkills: null
  };

  // testGoogleAPI = () => {
  //   const sheets = google.sheets({ version: "v4" });
  //   sheets.spreadsheets.values
  //     .get("1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo")
  //     .then(response => console.log(response))
  //     .catch(err => console.log("There was an error"));
  // };

  getClassAbilities = (classURL, whichState) => {
    const localClassSave = localStorage.getItem(whichState);
    if (localClassSave) {
      this.setState({ [whichState]: JSON.parse(localClassSave) });
      return;
    }

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
    // this.testGoogleAPI();
    return (
      <div className="App">
        <div className="linked-list">
          <Link to="/warrior">
            <img
              src={WarriorIcon}
              className={"linked-list-icon"}
              alt="Warrior"
            />
          </Link>
          <Link to="/priest">
            <img src={PriestIcon} className={"linked-list-icon"} alt="Priest" />
          </Link>
          <Link to="/rogue">
            <img src={RogueIcon} className={"linked-list-icon"} alt="Rogue" />
          </Link>
          <Link to="/deathknight">
            <img
              src={DeathKnightIcon}
              className={"linked-list-icon"}
              alt="Death Knight"
            />
          </Link>
          <Link to="/shaman">
            <img src={ShamanIcon} className={"linked-list-icon"} alt="Shaman" />
          </Link>
          <Link to="/paladin">
            <img
              src={PaladinIcon}
              className={"linked-list-icon"}
              alt="Paladin"
            />
          </Link>
          <Link to="/druid">
            <img src={DruidIcon} className={"linked-list-icon"} alt="Druid" />
          </Link>
          <Link to="/monk">
            <img src={MonkIcon} className={"linked-list-icon"} alt="Monk" />
          </Link>
          <Link to="/demonhunter">
            <img
              src={DemonHunterIcon}
              className={"linked-list-icon"}
              alt="Demon Hunter"
            />
          </Link>
          <Link to="/mage">
            <img src={MageIcon} className={"linked-list-icon"} alt="Mage" />
          </Link>
          <Link to="/warlock">
            <img
              src={WarlockIcon}
              className={"linked-list-icon"}
              alt="Warlock"
            />
          </Link>
          <Link to="/hunter">
            <img src={HunterIcon} className={"linked-list-icon"} alt="Hunter" />
          </Link>
        </div>
        <Route
          exact
          path="/warrior"
          render={() =>
            this.state.warriorSkills !== null ? (
              <ClassPage
                wowclass="Warrior"
                classIcon={WarriorIcon}
                abilities={this.state.warriorSkills}
                whichState="warriorSkills"
              />
            ) : (
              (this.getClassAbilities(warriorURL, "warriorSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/priest"
          render={() =>
            this.state.priestSkills !== null ? (
              <ClassPage
                wowclass="Priest"
                classIcon={PriestIcon}
                abilities={this.state.priestSkills}
                whichState="priestSkills"
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
            this.state.demonhunterSkills !== null ? (
              <ClassPage
                wowclass="Demon Hunter"
                classIcon={DemonHunterIcon}
                abilities={this.state.demonhunterSkills}
                whichState="demonhunterSkills"
              />
            ) : (
              (this.getClassAbilities(demonhunterURL, "demonhunterSkills"),
              <h1>Loading...</h1>)
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
                whichState="hunterSkills"
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
                whichState="druidSkills"
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
                whichState="shamanSkills"
              />
            ) : (
              (this.getClassAbilities(shamanURL, "shamanSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/paladin"
          render={() =>
            this.state.paladinSkills !== null ? (
              <ClassPage
                wowclass="Paladin"
                classIcon={PaladinIcon}
                abilities={this.state.paladinSkills}
                whichState="paladinSkills"
              />
            ) : (
              (this.getClassAbilities(paladinURL, "paladinSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/monk"
          render={() =>
            this.state.monkSkills !== null ? (
              <ClassPage
                wowclass="Monk"
                classIcon={MonkIcon}
                abilities={this.state.monkSkills}
                whichState="monkSkills"
              />
            ) : (
              (this.getClassAbilities(monkURL, "monkSkills"),
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
                whichState="warlockSkills"
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
                whichState="rogueSkills"
              />
            ) : (
              (this.getClassAbilities(rogueURL, "rogueSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/deathknight"
          render={() =>
            this.state.deathknightSkills !== null ? (
              <ClassPage
                wowclass="Death Knight"
                classIcon={DeathKnightIcon}
                abilities={this.state.deathknightSkills}
                whichState="deathknightSkills"
              />
            ) : (
              (this.getClassAbilities(deathknightURL, "deathknightSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
        <Route
          exact
          path="/mage"
          render={() =>
            this.state.mageSkills !== null ? (
              <ClassPage
                wowclass="Mage"
                classIcon={MageIcon}
                abilities={this.state.mageSkills}
                whichState="mageSkills"
              />
            ) : (
              (this.getClassAbilities(mageURL, "mageSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
      </div>
    );
  }
}

export default App;
