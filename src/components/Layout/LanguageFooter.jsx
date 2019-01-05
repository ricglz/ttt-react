import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LanguageFooter = ({ locale }) => (
  <div className="row justify-content-center mt-5">
    <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
      <Link to="/language" className="btn w-100 locale-button">
        {locale}
      </Link>
    </div>
  </div>
);

LanguageFooter.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default LanguageFooter;
