import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  locale: string
};

const LanguageFooter = ({ locale }: Props) => (
  <div className="row justify-content-center mt-5">
    <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
      <Link to="/language" className="btn w-100 locale-button">
        {locale}
      </Link>
    </div>
  </div>
);

export default LanguageFooter;
