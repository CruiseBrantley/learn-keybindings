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

  onSave = () => {
    localStorage.setItem(
      this.props.whichState,
      JSON.stringify(this.state.abilityArray)
    );
    this.setState({ new: this.state.new });
  };

  onDelete = () => {
    localStorage.removeItem(this.props.whichState);
    this.setState({ new: this.state.new });
  };

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
    if (e.button === 0) {
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
    } else if (e.button === 1) {
      if (
        this.state.nextAbility.bind === "MC" &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.altKey
      )
        this.onSubmit();
      else if (this.state.nextAbility.bind === "S+MC" && e.shiftKey)
        this.onSubmit();
      else if (this.state.nextAbility.bind === "C+MC" && e.ctrlKey)
        this.onSubmit();
      else if (this.state.nextAbility.bind === "A+MC" && e.altKey)
        this.onSubmit();
      else this.onIncorrect();
    } else if (e.button === 2) {
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

  onImgClick = (e, index) => {
    e.preventDefault();
    console.log(e.button);
    const tempArray = this.state.abilityArray;
    if (e.button === 0) {
      if (e.shiftKey) tempArray[index].bind = "S+LC";
      else if (e.ctrlKey) tempArray[index].bind = "C+LC";
      else if (e.altKey) tempArray[index].bind = "A+LC";
      else tempArray[index].bind = "LC";
    } else if (e.button === 1) {
      if (e.shiftKey) tempArray[index].bind = "S+MC";
      else if (e.ctrlKey) tempArray[index].bind = "C+MC";
      else if (e.altKey) tempArray[index].bind = "A+MC";
      else tempArray[index].bind = "MC";
    } else if (e.button === 2) {
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
        <div
          className="current-ability-container"
          onContextMenu={e => e.preventDefault()}
        >
          {this.state.nextAbility ? (
            <div className={"next-ability"}>
              <img
                className={this.getAnimationClassName()}
                src={this.state.nextAbility.ability}
                onClick={e => e.preventDefault()}
                onContextMenu={e => e.preventDefault()}
                onMouseDown={this.onIconClick}
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
        <div
          className={"abilities-mapped"}
          onContextMenu={e => e.preventDefault()}
        >
          {this.state.abilityArray.map((item, index) => {
            return (
              <div key={index} className={"individual-ability-mapped"}>
                <img
                  data-tip={item.name}
                  src={item.ability}
                  alt={item.name || ""}
                  onClick={e => e.preventDefault()}
                  onContextMenu={e => e.preventDefault()}
                  onMouseDown={e => this.onImgClick(e, index)}
                  className={"individual-ability-img"}
                />
                <input
                  value={this.state.abilityArray[index].bind}
                  onChange={e => e.preventDefault()}
                  onFocus={() => this.onFocus(index)}
                  onBlur={this.onBlur}
                />
              </div>
            );
          })}
        </div>
        <button onClick={this.onSave} className="link-to-class">
          Save Bindings
        </button>
        {localStorage.getItem(this.props.whichState) ? (
          <button onClick={this.onDelete} className="link-to-class">
            Delete Saved Bindings
          </button>
        ) : null}
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </div>
    );
  }
}

export default ClassPage;
