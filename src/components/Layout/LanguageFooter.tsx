import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function LanguageFooter() {
  const { i18n } = useTranslation();
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
        <Link to="/language" className="btn w-100 locale-button">
          {i18n.language}
        </Link>
      </div>
    </div>
  );
}
