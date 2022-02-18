import React from 'react';
import 'react-notifications/lib/notifications.css';
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

type Props = {
  locale: string,
  changeLocale: (locale: string) => void,
};

function Layout({ locale, changeLocale }: Props) {
  const { user, logOut } = useUser();

  const renderGameMenu = React.useCallback(() => (
    user == null ? null : (
      <GameMenu
        logOut={logOut}
        user={user}
      />
    )
  ), [logOut, user]);
  const renderLanguage = React.useCallback(() => (
    <LanguagePage
      currentLocale={locale}
      changeLocale={changeLocale}
    />
  ), [changeLocale, locale]);
  const renderSinglePlayer = React.useCallback(() => <Game ai />, []);
  return React.useMemo(() => (
    <>
      <SwitchWrapper
        user={user}
        renderGameMenu={renderGameMenu}
        renderSinglePlayer={renderSinglePlayer}
        renderLanguage={renderLanguage}
      />
      <LanguageFooter locale={locale} />
    </>
  ), [user, renderGameMenu, renderSinglePlayer, renderLanguage, locale]);
}

export default Layout;
