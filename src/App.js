import React, { Component } from "react";
import "./App.css";
// import Priest from "./components/classes/priest.js";
import swp from "./wowiconpack/Spells/ShadowWordPain.png";
import psychicScream from "./wowiconpack/Spells/PsychicScream.png";
import shadowFiend from "./wowiconpack/Spells/Shadowfiend.png";
import priestIcon from "./wowiconpack/Characters and Creatures/priest.png";

const abilityArray = [
  { ability: swp, bind: "3" },
  { ability: psychicScream, bind: "c" },
  { ability: shadowFiend, bind: "r" }
];

class App extends Component {
  state = {
    clicked: false,
    incorrect: false,
    new: true,
    nextAbility: abilityArray[Math.floor(Math.random() * abilityArray.length)]
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  escFunction = theKey => {
    if (theKey.key === this.state.nextAbility.bind) this.onSubmit();
    else this.onIncorrect();
    console.log(theKey, "was pressed");
  };

  onSubmit = () => {
    this.setState({ clicked: true });

    setTimeout(() => {
      this.getNextAbility();
      this.setState({ clicked: false, new: true });
    }, 500); // wait half a second, then reset to false
  };

  onIncorrect = () => {
    this.setState({ incorrect: true });

    setTimeout(() => {
      this.setState({ incorrect: false, new: false });
    }, 500); // wait half a second, then reset to false
  };

  getNextAbility = () => {
    this.setState({
      nextAbility: abilityArray[Math.floor(Math.random() * abilityArray.length)]
    });
  };

  getAnimationState = () => {
    console.log(this.state);
    if (this.state.clicked) return "current-ability-animate";
    if (this.state.incorrect) return "current-ability-incorrect";
    if (this.state.new) return "current-ability-init";
  };

  render() {
    // let nextAbility = this.getNextAbility();
    return (
      <div className="App">
        <div className={"wow-class-name"}>
          <img src={priestIcon} className={"wow-class-name-icon"} alt={""} />
          <h1>Priest</h1>
        </div>
        <div className="current-ability-container">
          <img
            onClick={this.onSubmit}
            className={this.getAnimationState()}
            src={this.state.nextAbility.ability}
            alt={""}
          />
        </div>
        <button onClick={this.onIncorrect}>X</button>
      </div>
    );
  }
}

export default App;
