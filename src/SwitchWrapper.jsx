import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { userPropType } from './constants/props';

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

const SwitchWrapper = ({
  renderSinglePlayer, renderGameMenu, renderLanguage, user,
}) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/tutorial" component={Tutorial} />
    <Route path="/singleplayer" render={renderSinglePlayer} />
    <Route path="/multiplayer" component={Game} />
    {Object.keys(user).length === 0 ? (
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

SwitchWrapper.propTypes = {
  user: userPropType.isRequired,
  renderGameMenu: PropTypes.func.isRequired,
  renderLanguage: PropTypes.func.isRequired,
  renderSinglePlayer: PropTypes.func.isRequired,
};

export default SwitchWrapper;
