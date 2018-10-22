import React from "react";
import Select from "react-select";
import { FormattedMessage } from "react-intl";

const easy = <FormattedMessage id="game.easy" default="Easy" />;
const medium = <FormattedMessage id="game.medium" default="Medium" />;
const hard = <FormattedMessage id="game.hard" default="Hard" />;
const options = [
  { value: 1, label: easy },
  { value: 2, label: medium },
  { value: 3, label: hard }
];
const placeholder = (
  <FormattedMessage
    id="game.placeholder"
    default="Choose the difficulty (Default easy)"
  />
);

const DifficultySelect = props => (
  <div className="row justify-content-center mb-3">
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <Select
        placeholder={placeholder}
        value={props.selectedOption}
        onChange={props.handleChange}
        options={options}
      />
    </div>
  </div>
);

export default DifficultySelect;
