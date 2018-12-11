import React from 'react';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const easy = <FormattedMessage id="game.easy" default="Easy" />;
const medium = <FormattedMessage id="game.medium" default="Medium" />;
const hard = <FormattedMessage id="game.hard" default="Hard" />;
const options = [
  { value: 1, label: easy },
  { value: 2, label: medium },
  { value: 3, label: hard },
];
const placeholder = (
  <FormattedMessage
    id="game.placeholder"
    default="Choose the difficulty (Default easy)"
  />
);

const DifficultySelect = ({ selectedOption, handleChange }) => (
  <div className="row justify-content-center mb-3">
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <Select
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  </div>
);

DifficultySelect.propTypes = {
  selectedOption: PropTypes.exact({
    value: PropTypes.number.isRequired,
    label: PropTypes.element.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
};

DifficultySelect.defaultProps = {
  selectedOption: null,
};

export default DifficultySelect;
