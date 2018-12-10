import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const DefaultButton = ({ func, text }) => (
  <div className="col">
    <button
      type="button"
      className="btn btn-game btn-lg btn-danger"
      onClick={func}
    >
      <FormattedMessage id={text} default="Back" />
    </button>
  </div>
);

DefaultButton.propTypes = {
  func: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default DefaultButton;
