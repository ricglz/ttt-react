import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUser } from './functions/OtherHooks';

const Contributors = lazy(
  () => import('./components/Contributors/Contributors'),
);
const Home = lazy(() => import('./components/Home/Home'));
const Game = lazy(() => import('./components/Game/Game'));
const Login = lazy(() => import('./components/OnlineGame/Login'));
const Tutorial = lazy(() => import('./components/Tutorial/Tutorial'));
const GameMenu = lazy(() => import('./components/OnlineGame/GameMenu'));
const LanguagePage = lazy(() => import('./components/Languages/LanguagePage'));

const SwitchWrapper = () => {
  const { user, logOut } = useUser();
  const gameMenu = user == null ? <Login /> : <GameMenu logOut={logOut} user={user} />;
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Suspense fallback="loading">
            <Home />
          </Suspense>
        )}
      />
      <Route
        path="tutorial"
        element={(
          <Suspense fallback="loading">
            <Tutorial />
          </Suspense>
        )}
      />
      <Route
        path="singleplayer"
        element={(
          <Suspense fallback="loading">
            <Game isAi />
          </Suspense>
        )}
      />
      <Route
        path="multiplayer"
        element={(
          <Suspense fallback="loading">
            <Game />
          </Suspense>
        )}
      />
      <Route
        path="login"
        element={<Suspense fallback="loading">{gameMenu}</Suspense>}
      />
      <Route
        path="online"
        element={<Suspense fallback="loading">{gameMenu}</Suspense>}
      />
      <Route
        path="language"
        element={(
          <Suspense fallback="loading">
            <LanguagePage />
          </Suspense>
        )}
      />
      <Route
        path="contributors"
        element={(
          <Suspense fallback="loading">
            <Contributors />
          </Suspense>
        )}
      />
    </Routes>
  );
};

export default SwitchWrapper;
