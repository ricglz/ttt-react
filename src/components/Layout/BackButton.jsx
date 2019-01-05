import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const BackButton = ({ text, url }) => (
  <div className="col">
    <Link className="btn btn-game btn-lg btn-danger" to={url}>
      <FormattedMessage id={text} default="Back" />
    </Link>
  </div>
);

BackButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default BackButton;
