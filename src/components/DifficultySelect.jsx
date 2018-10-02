import React, { Component } from "react";
import Select from "react-select";
import { FormattedMessage } from "react-intl";

class DifficultySelect extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    let easy = <FormattedMessage id="game.easy" default="Easy" />;
    let medium = <FormattedMessage id="game.medium" default="Medium" />;
    let hard = <FormattedMessage id="game.hard" default="Hard" />;
    const options = [
      { value: 1, label: easy },
      { value: 2, label: medium },
      { value: 3, label: hard }
    ];
    let placeholder = <FormattedMessage id="game.placeholder" default="Choose the difficulty (Default easy)" />;;
    return (
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <Select
            placeholder={placeholder}
            value={this.props.selectedOption}
            onChange={this.props.handleChange}
            options={options}
          />
        </div>
      </div>
    );
  }
}

export default DifficultySelect;
