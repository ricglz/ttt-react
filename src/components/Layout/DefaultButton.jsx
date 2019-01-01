import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const DefaultButton = ({ text, url }) => (
  <div className="col">
    <Link className="btn btn-game btn-lg btn-danger" to={url}>
      <FormattedMessage id={text} default="Back" />
    </Link>
  </div>
);

DefaultButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default DefaultButton;
