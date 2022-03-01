import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import { useUser } from './functions/OtherHooks';

const Contributors = loadable(
  () => import('./components/Contributors/Contributors'),
);
const Home = loadable(() => import('./components/Home/Home'));
const Game = loadable(() => import('./components/Game/Game'));
const Login = loadable(() => import('./components/OnlineGame/Login'));
const Tutorial = loadable(() => import('./components/Tutorial/Tutorial'));
const GameMenu = loadable(() => import('./components/OnlineGame/GameMenu'));
const LanguagePage = loadable(
  () => import('./components/Languages/LanguagePage'),
);

type Props = {
  currentLocale: string;
  changeLocale: (locale: string) => void;
};

const SwitchWrapper = (languageProps: Props) => {
  const { user, logOut } = useUser();
  const gameMenu = user == null ? null : <GameMenu logOut={logOut} user={user} />;
  return (
    <Routes>
      <Route path="/">
        <Home />
      </Route>
      <Route path="tutorial">
        <Tutorial />
      </Route>
      <Route path="singleplayer">
        <Game isAi />
      </Route>
      <Route path="multiplayer">
        <Game />
      </Route>
      <Route path="login">{gameMenu == null ? <Login /> : gameMenu}</Route>
      <Route path="online">{gameMenu}</Route>
      <Route path="language">
        <LanguagePage {...languageProps} />
      </Route>
      <Route path="contributors">
        <Contributors />
      </Route>
    </Routes>
  );
};

export default SwitchWrapper;
