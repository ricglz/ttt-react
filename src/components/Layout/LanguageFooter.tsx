import i18next from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LanguageFooter() {
  const locale = i18next.language;
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
        <Link to="/language" className="btn w-100 locale-button">
          {locale}
        </Link>
      </div>
    </div>
  );
}
