import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DefaultButton from '../Layout/BackButton';

const ButtonsFooter = ({ reset, back }) => (
  <div className="row justify-content-center">
    <div className="col">
      <button className="btn btn-game btn-lg btn-danger" onClick={reset}>
        <FormattedMessage id="game.reset" default="Back" />
      </button>
    </div>
    <DefaultButton text="shared.back" url={back} />
  </div>
);

ButtonsFooter.propTypes = {
  reset: PropTypes.func.isRequired,
  back: PropTypes.string.isRequired,
};

export default ButtonsFooter;
