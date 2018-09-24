import React, { Component } from "react";
import "./App.css";
// import Priest from "./components/classes/priest.js";
import swp from "./wowiconpack/Spells/ShadowWordPain.png";
import priestIcon from "./wowiconpack/Characters and Creatures/priest.png";

class App extends Component {
  state = {
    clicked: false
  };

  onSubmit = () => {
    this.setState({ clicked: true });

    setTimeout(() => {
      this.setState({ clicked: false });
    }, 500); // wait 5 seconds, then reset to false
  };

  render() {
    return (
      <div className="App">
        <div className={"wow-class-name"}>
          <img src={priestIcon} className={"wow-class-name-icon"} alt={""} />
          <h1>Priest</h1>
        </div>
        <div className="current-ability-container">
          <img
            onClick={this.onSubmit}
            className={ this.state.clicked ? "current-ability-animate" : ""}
            src={swp}
            alt={""}
          />
        </div>
        {/* <button onClick={this.onSubmit}>X</button> */}
      </div>
    );
  }
}

export default App;
