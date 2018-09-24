import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Priest from "./components/classes/priest.js";
import swp from "./wowiconpack/Spells/ShadowWordPain.png";
import priestIcon from "./wowiconpack/Characters and Creatures/priest.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className={"wow-class-name"}>
          <img src={priestIcon} className={"wow-class-name-icon"}/>
          <Priest/>
        </div>
          <img src={swp}/>
      </div>
    );
  }
}

export default App;
