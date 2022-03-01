import React from 'react';
import 'react-notifications/lib/notifications.css';
import LanguageFooter from './components/Layout/LanguageFooter';

import './css/bootstrap.css';
import './css/home.css';
import './css/board.css';
import './css/fonts.css';
import './css/everything.css';

import SwitchWrapper from './SwitchWrapper';

type Props = {
  locale: string;
  changeLocale: (locale: string) => void;
};

function Layout({ locale, changeLocale }: Props) {
  return (
    <>
      <SwitchWrapper changeLocale={changeLocale} currentLocale={locale} />
      <LanguageFooter locale={locale} />
    </>
  );
}

export default Layout;
