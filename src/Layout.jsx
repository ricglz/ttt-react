import React from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import loadable from '@loadable/component';
import LanguageFooter from './components/Layout/LanguageFooter';
import './css/bootstrap.css';
import './css/home.css';
import './css/board.css';
import './css/fonts.css';
import './css/everything.css';
import { useUser } from './functions/OtherHooks';
import SwitchWrapper from './SwitchWrapper';

const Game = loadable(
  () => import('./components/Game/Game'),
);
const GameMenu = loadable(
  () => import('./components/OnlineGame/GameMenu'),
);
const LanguagePage = loadable(
  () => import('./components/Languages/LanguagePage'),
);

function Layout({ locale, changeLocale }) {
  const [user, logOut] = useUser();

  const renderGameMenu = React.useCallback(({ history }) => (
    <GameMenu
      logOut={logOut}
      user={user}
      history={history}
    />
  ), [logOut, user]);
  const renderLanguage = React.useCallback(({ history }) => (
    <LanguagePage
      locale={locale}
      changeLocale={changeLocale}
      history={history}
    />
  ), [changeLocale, locale]);
  const renderSinglePlayer = React.useCallback(() => <Game ai />, []);
  return React.useMemo(() => (
    <>
      <Router>
        <>
          <SwitchWrapper
            user={user}
            renderGameMenu={renderGameMenu}
            renderSinglePlayer={renderSinglePlayer}
            renderLanguage={renderLanguage}
          />
          <LanguageFooter locale={locale} />
        </>
      </Router>
      <NotificationContainer />
    </>
  ), [user, renderGameMenu, renderSinglePlayer, renderLanguage, locale]);
}

Layout.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Layout;
