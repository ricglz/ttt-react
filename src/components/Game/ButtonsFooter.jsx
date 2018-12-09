import React from 'react';
import PropTypes from 'prop-types';
import DefaultButton from '../Layout/DefaultButton';

const ButtonsFooter = ({ reset, back }) => (
  <div className="row justify-content-center">
    <DefaultButton text="game.reset" func={reset} />
    <DefaultButton text="shared.back" func={back} />
  </div>
);

ButtonsFooter.propTypes = {
  reset: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

export default ButtonsFooter;
