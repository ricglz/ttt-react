import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

function renderText(staticText, text) {
  return ( staticText ? (
    <span>{text}</span>
  ) : (
    <FormattedMessage id={text} />
  ));
}

const HomeButton = ({ text, staticText, url }) => (
  <div className="row justify-content-center border-top py-3">
    <button type="button" className="btn btn-home">
      <Link to={url} >{renderText(staticText, text)}</Link>
    </button>
  </div>
);

HomeButton.propTypes = {
  text: PropTypes.string.isRequired,
  staticText: PropTypes.bool,
};

HomeButton.defaultProps = {
  staticText: false,
};

export default HomeButton;
