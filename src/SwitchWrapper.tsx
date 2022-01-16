import React, { ReactChild } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import type { User } from './functions/OtherHooks';

const Contributors = loadable(
  () => import('./components/Contributors/Contributors'),
);
const Home = loadable(
  () => import('./components/Home/Home'),
);
const Game = loadable(
  () => import('./components/Game/Game'),
);
const Login = loadable(
  () => import('./components/OnlineGame/Login'),
);
const Tutorial = loadable(
  () => import('./components/Tutorial/Tutorial'),
);

type RenderFn = () => ReactChild;
type Props = {
  renderSinglePlayer: RenderFn,
  renderGameMenu: RenderFn,
  renderLanguage: RenderFn,
  user: User | null
};

const SwitchWrapper = ({
  renderSinglePlayer, renderGameMenu, renderLanguage, user,
}: Props) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/tutorial" component={Tutorial} />
    <Route path="/singleplayer" render={renderSinglePlayer} />
    <Route path="/multiplayer" component={Game} />
    {user == null ? (
      <Route path="/login" component={Login} />
    ) : (
      <Route path="/login" render={renderGameMenu} />
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
);

export default SwitchWrapper;
