import React from 'react';
import 'react-notifications/lib/notifications.css';
import LanguageFooter from './components/Layout/LanguageFooter';

import './css/bootstrap.css';
import './css/home.css';
import './css/board.css';
import './css/fonts.css';
import './css/everything.css';

import SwitchWrapper from './SwitchWrapper';

function Layout() {
  return (
    <>
      <SwitchWrapper />
      <LanguageFooter />
    </>
  );
}

export default Layout;
