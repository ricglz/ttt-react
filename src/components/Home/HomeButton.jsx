import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const HomeButton = ({ func, text, staticText }) => (
  <div className="row justify-content-center border-top py-3">
    <button type="button" onClick={func} className="btn btn-home">
      { staticText ? (
        <span>{text}</span>
      ) : (
        <FormattedMessage id={text} />
      )
    }
    </button>
  </div>
);

HomeButton.propTypes = {
  func: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  staticText: PropTypes.bool,
};

HomeButton.defaultProps = {
  staticText: false,
};

export default HomeButton;
