import React from 'react';
import PropTypes from 'prop-types';
import BackButton from '../Layout/BackButton';
import ResetButton from '../Layout/ResetButton';

const ButtonsFooter = ({ reset, back }) => (
  <div className="row justify-content-center">
    <ResetButton onClick={reset} />
    <BackButton text="shared.back" url={back} />
  </div>
);

ButtonsFooter.propTypes = {
  reset: PropTypes.func.isRequired,
  back: PropTypes.string.isRequired,
};

export default ButtonsFooter;
