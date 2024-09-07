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
import PaladinIcon from "./wowiconpack/Spells/paladin.png";
import WarriorIcon from "./wowiconpack/Spells/warrior.png";
import MonkIcon from "./wowiconpack/Spells/monk.jpg";
import MageIcon from "./wowiconpack/Spells/mage.png";
import DeathKnightIcon from "./wowiconpack/Spells/deathknight.jpg";

// Updated Google Sheets API v4 URL format
const spreadsheetId = "1GGLOnEyx8BNVWCXns9p2ZPisEg8vjHhqC7_8dGlyePo";
const baseSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/`;
const sheetsKey = "AIzaSyCw0jbJyy5hRJifmHi8-u5wpTBMLe3-jAE";

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

  getClassAbilities = async (sheetName, whichState) => {
    const localClassSave = localStorage.getItem(whichState);
    if (localClassSave) {
      this.setState({ [whichState]: JSON.parse(localClassSave) });
      return;
    }

    try {
      const response = await axios.get(`${baseSheetUrl}${sheetName}?key=${sheetsKey}`);
      const data = response.data.values;
      const buildSkills = [];

      for (let i = 1; i < data.length; i += 1) {
        const [, name, iconFilename] = data[i];
        buildSkills.push({
          ability: require(`./wowiconpack/Spells/${iconFilename}.png`),
          bind: "",
          name: name
        });
      }

      this.setState({ [whichState]: buildSkills });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
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
              (this.getClassAbilities("Warrior", "warriorSkills"),
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
              (this.getClassAbilities("Priest", "priestSkills"),
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
              (this.getClassAbilities("Demon Hunter", "demonhunterSkills"),
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
              (this.getClassAbilities("Hunter", "hunterSkills"),
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
              (this.getClassAbilities("Druid", "druidSkills"),
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
              (this.getClassAbilities("Shaman", "shamanSkills"),
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
              (this.getClassAbilities("Paladin", "paladinSkills"),
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
              (this.getClassAbilities("Monk", "monkSkills"),
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
              (this.getClassAbilities("Warlock", "warlockSkills"),
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
              (this.getClassAbilities("Rogue", "rogueSkills"),
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
              (this.getClassAbilities("DeathKnight", "deathknightSkills"),
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
              (this.getClassAbilities("Mage", "mageSkills"),
              <h1>Loading...</h1>)
            )
          }
        />
      </div>
    );
  }
}

export default App;
