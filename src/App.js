import React, { Component } from "react";
import "./App.css";
// import Priest from "./components/classes/priest.js";
import priestIcon from "./wowiconpack/Characters and Creatures/priest.png";
import swp from "./wowiconpack/Spells/ShadowWordPain.png";
import psychicScream from "./wowiconpack/Spells/PsychicScream.png";
import shadowFiend from "./wowiconpack/Spells/Shadowfiend.png";
import mindFlay from "./wowiconpack/Spells/SiphonMana.png";
import mindBlast from "./wowiconpack/Spells/UnholyFrenzy.png";

class App extends Component {
  state = {
    clicked: false,
    incorrect: false,
    new: true,
    editing: false,
    nextAbility: {},
    textField: "",
    abilityArray: [
      { ability: swp, bind: "3" },
      { ability: psychicScream, bind: "c" },
      { ability: shadowFiend, bind: "r" },
      { ability: mindFlay, bind: "2"},
      { ability: mindBlast, bind: "4"},
    ]
  };

  componentDidMount() {
    this.setState({nextAbility: this.state.abilityArray[Math.floor(Math.random() * this.state.abilityArray.length)]})
    document.addEventListener("keydown", this.keyRead, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyRead, false);
  }

  keyRead = theKey => {
    if (this.state.editing === false && theKey.key !== "Shift") {
      if (theKey.key === this.state.nextAbility.bind) this.onSubmit();
      else this.onIncorrect();
    }
  };

  onChange = (e, index) => {
    const tempArray = this.state.abilityArray;
    tempArray[index].bind = e.target.value;
    this.setState({[this.state.nextAbility]: tempArray})
  }

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
      nextAbility: this.state.abilityArray[Math.floor(Math.random() * this.state.abilityArray.length)]
    });
  };

  onFocus = () => {
    this.setState({editing: true});
  }

  onBlur = () => {
    this.setState({editing: false});
  }

  getAnimationClassName = () => {
    if (this.state.clicked) return "current-ability-animate current-ability";
    if (this.state.incorrect)
      return "current-ability-incorrect current-ability";
    if (this.state.new) return "current-ability-init current-ability";
    else return "current-ability";
  };

  render() {
    // let nextAbility = this.getNextAbility();
    return (
      <div className="App">
        <div className="name-and-ability-pane">
          <div className={"wow-class-name"}>
            <img src={priestIcon} className={"wow-class-name-icon"} alt={""} />
            <h1>Priest</h1>
          </div>
          <div className="current-ability-container">
            <img
              onClick={this.onSubmit}
              className={this.getAnimationClassName()}
              src={this.state.nextAbility.ability}
              alt={""}
            />
          </div>
          <div className={"abilities-mapped"}>
            {this.state.abilityArray.map((item, index) => {
              return (
                <div key={index} className={"individual-ability-mapped"}>
                  <img src={item.ability} alt={""} />
                  {/* <span>{item.bind}</span> */}
                  <input value={this.state.abilityArray[index].bind} onChange={e => this.onChange(e, index)} onFocus={this.onFocus} onBlur={this.onBlur}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
