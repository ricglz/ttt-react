import React from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contributors from './components/Contributors/Contributors';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import Login from './components/OnlineGame/Login';
import GameMenu from './components/OnlineGame/GameMenu';
import Tutorial from './components/Tutorial/Tutorial';
import LanguageFooter from './components/Layout/LanguageFooter';
import LanguagePage from './components/Languages/LanguagePage';
import { userPropType } from './constants/props';
import './css/bootstrap.css';
import './css/home.css';
import './css/board.css';
import './css/fonts.css';
import './css/everything.css';
import { useUser } from './functions/OtherHooks';

const RenderLayout = ({
  user, renderGameMenu, renderLanguage, locale,
}) => {
  const useSinglePlayer = React.useCallback(() => <Game ai />, []);
  return (
    <>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/singleplayer" render={useSinglePlayer} />
            <Route path="/multiplayer" component={Game} />
            {Object.keys(user).length === 0 ? (
              <Route path="/login" component={Login} />
            ) : (
              <Route
                path="/login"
                render={renderGameMenu}
              />
            )}
            <Route
              path="/online"
              render={renderGameMenu}
            />
            <Route
              path="/language"
              render={renderLanguage}
            />
            <Route path="/contributors" component={Contributors} />
          </Switch>
          <LanguageFooter locale={locale} />
        </>
      </Router>
      <NotificationContainer />
    </>
  );
};

RenderLayout.propTypes = {
  user: userPropType.isRequired,
  renderGameMenu: PropTypes.func.isRequired,
  renderLanguage: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

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
  return React.useMemo(() => (
    RenderLayout({
      user, renderGameMenu, renderLanguage, locale,
    })
  ), [user, renderGameMenu, renderLanguage, locale]);
}

Layout.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Layout;
