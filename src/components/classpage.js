import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

class ClassPage extends Component {
  state = {
    clicked: false,
    incorrect: false,
    new: true,
    editing: false,
    index: null,
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
    theKey.preventDefault();
    if (this.state.editing) {
      if (theKey.key === "Backspace") {
        const tempArray = this.state.abilityArray;
        tempArray[this.state.index].bind = "";
        this.setState({ abilityArray: tempArray });
      } else if (theKey.shiftKey && theKey.key !== "Shift") {
        const tempArray = this.state.abilityArray;
        tempArray[this.state.index].bind = "S+" + theKey.key.toUpperCase();
        this.setState({ abilityArray: tempArray });
      } else if (theKey.ctrlKey && theKey.key !== "Control") {
        const tempArray = this.state.abilityArray;
        tempArray[this.state.index].bind = "C+" + theKey.key.toUpperCase();
        this.setState({ abilityArray: tempArray });
      } else if (theKey.altKey && theKey.key !== "Alt") {
        const tempArray = this.state.abilityArray;
        tempArray[this.state.index].bind = "A+" + theKey.key.toUpperCase();
        this.setState({ abilityArray: tempArray });
      } else if (
        theKey.key !== "Shift" &&
        theKey.key !== "Control" &&
        theKey.key !== "Alt"
      ) {
        const tempArray = this.state.abilityArray;
        tempArray[this.state.index].bind = theKey.key.toUpperCase();
        this.setState({ abilityArray: tempArray });
      }
    } else if (
      !this.state.editing &&
      theKey.key !== "Shift" &&
      theKey.key !== "Control" &&
      theKey.key !== "Alt"
    ) {
      if (
        !theKey.shiftKey &&
        !theKey.ctrlKey &&
        !theKey.altKey &&
        theKey.key.toUpperCase() === this.state.nextAbility.bind
      )
        this.onSubmit();
      else if (
        theKey.shiftKey &&
        "S+" + theKey.key.toUpperCase() === this.state.nextAbility.bind
      )
        this.onSubmit();
      else if (
        theKey.ctrlKey &&
        "C+" + theKey.key.toUpperCase() === this.state.nextAbility.bind
      )
        this.onSubmit();
      else if (
        theKey.altKey &&
        "A+" + theKey.key.toUpperCase() === this.state.nextAbility.bind
      )
        this.onSubmit();
      else this.onIncorrect();
    }
    if (!this.state.nextAbility || this.state.nextAbility.bind === "")
      this.getNextAbility();
  };

  onIconClick = e => {
    e.preventDefault();
    if (e.type === "click") {
      if (
        this.state.nextAbility.bind === "LC" &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.altKey
      )
        this.onSubmit();
      else if (this.state.nextAbility.bind === "S+LC" && e.shiftKey)
        this.onSubmit();
      else if (this.state.nextAbility.bind === "C+LC" && e.ctrlKey)
        this.onSubmit();
      else if (this.state.nextAbility.bind === "A+LC" && e.altKey)
        this.onSubmit();
      else this.onIncorrect();
    } else if (e.type === "contextmenu") {
      if (
        this.state.nextAbility.bind === "RC" &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.altKey
      )
        this.onSubmit();
      else if (this.state.nextAbility.bind === "S+RC" && e.shiftKey)
        this.onSubmit();
      else if (this.state.nextAbility.bind === "C+RC" && e.ctrlKey)
        this.onSubmit();
      else if (this.state.nextAbility.bind === "A+RC" && e.altKey)
        this.onSubmit();
      else this.onIncorrect();
    } else this.onIncorrect();
  };

  onChange = (e, index) => {
    e.preventDefault();
  };

  onImgClick = (e, index) => {
    e.preventDefault();
    const tempArray = this.state.abilityArray;
    if (e.type === "click") {
      if (e.shiftKey) tempArray[index].bind = "S+LC";
      else if (e.ctrlKey) tempArray[index].bind = "C+LC";
      else if (e.altKey) tempArray[index].bind = "A+LC";
      else tempArray[index].bind = "LC";
    } else if (e.type === "contextmenu") {
      if (e.shiftKey) tempArray[index].bind = "S+RC";
      else if (e.ctrlKey) tempArray[index].bind = "C+RC";
      else if (e.altKey) tempArray[index].bind = "A+RC";
      else tempArray[index].bind = "RC";
    }
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

  onFocus = index => {
    this.setState({ editing: true, index: index });
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
                className={this.getAnimationClassName()}
                src={this.state.nextAbility.ability}
                onClick={this.onIconClick}
                onContextMenu={this.onIconClick}
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
                  data-tip={item.name}
                  src={item.ability}
                  alt={""}
                  onClick={e => this.onImgClick(e, index)}
                  onContextMenu={e => this.onImgClick(e, index)}
                  className={"individual-ability-img"}
                />
                <input
                  value={this.state.abilityArray[index].bind}
                  onChange={e => this.onChange(e, index)}
                  onFocus={() => this.onFocus(index)}
                  onBlur={this.onBlur}
                />
              </div>
            );
          })}
        </div>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </div>
    );
  }
}

export default ClassPage;
