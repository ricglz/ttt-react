import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const DefaultButton = ({ onClick, text, defaultText }) => (
  <div className="col">
    <button
      type="button"
      className="btn btn-game btn-lg btn-danger"
      onClick={onClick}
    >
      <FormattedMessage id={text} default={defaultText} />
    </button>
  </div>
);

DefaultButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
};

export default DefaultButton;
