import React, { Component } from "react";

class Priest extends Component {
  state = {
    clicked: false,
    incorrect: false,
    new: true,
    editing: false,
    nextAbility: {},
    textField: "",
    abilityArray: this.props.abilities
  };

  componentDidMount() {
    this.getNextAbility();
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
    this.setState({ abilityArray: tempArray });
    if (!this.state.nextAbility || this.state.nextAbility.bind === "")
      this.getNextAbility();
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
    const filteredAbilities = this.state.abilityArray.filter(ability => {
      return ability.bind !== "";
    });
    if (filteredAbilities.length > 0) {
      this.setState({
        nextAbility:
          filteredAbilities[
            Math.floor(Math.random() * filteredAbilities.length)
          ]
      });
    } else {
      this.setState({ nextAbility: false });
    }
  };

  onFocus = () => {
    this.setState({ editing: true });
  };

  onBlur = () => {
    this.setState({ editing: false });
  };

  getAnimationClassName = () => {
    if (this.state.clicked) return "current-ability-animate current-ability";
    if (this.state.incorrect)
      return "current-ability-incorrect current-ability";
    if (this.state.new) return "current-ability-init current-ability";
    else return "current-ability";
  };

  render() {
    return (
      <div className="name-and-ability-pane">
        <div className={"wow-class-name"}>
          <img
            src={this.props.classIcon}
            className={"wow-class-name-icon"}
            alt={""}
          />
          <h1>{this.props.wowclass}</h1>
        </div>
        <div className="current-ability-container">
          {this.state.nextAbility ? (
            <div className={"next-ability"}>
              <img
                onClick={this.onSubmit}
                className={this.getAnimationClassName()}
                src={this.state.nextAbility.ability}
                alt={""}
              />
              <span className={"next-ability-name"}>
                {this.state.nextAbility.name}
              </span>
            </div>
          ) : (
            <h3 className="link-to-class">Try binding some abilities.</h3>
          )}
        </div>
        <div className={"abilities-mapped"}>
          {this.state.abilityArray.map((item, index) => {
            return (
              <div key={index} className={"individual-ability-mapped"}>
                <img
                  src={item.ability}
                  alt={""}
                  className={"individual-ability-img"}
                />
                <input
                  value={this.state.abilityArray[index].bind}
                  onChange={e => this.onChange(e, index)}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Priest;
