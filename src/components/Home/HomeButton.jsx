import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const HomeButton = ({ func, text }) => (
  <div className="row justify-content-center border-top py-3">
    <button type="button" onClick={func} className="btn btn-home">
      <FormattedMessage id={text} />
    </button>
  </div>
);

HomeButton.propTypes = {
  func: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default HomeButton;
