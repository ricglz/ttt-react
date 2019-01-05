import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import Login from './components/OnlineGame/Login';
import GameMenu from './components/OnlineGame/GameMenu';
import Tutorial from './components/Tutorial/Tutorial';
import LanguageFooter from './components/Layout/LanguageFooter';
import LanguagePage from './components/Languages/LanguagePage';
import './css/bootstrap.css';
import './css/home.css';
import './css/board.css';
import './css/fonts.css';
import './css/everything.css';
import { getRedirect } from './firebase/firebase';

class Layout extends Component {
  constructor(props) {
    super(props);
    const cachedUser = localStorage.getItem('user');
    const user = cachedUser ? JSON.parse(cachedUser) : {};
    this.state = { user };
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    getRedirect().then(({ user }) => {
      if (user) {
        const {
          displayName, email, phoneNumber, photoUrl, uid,
        } = user;
        const newUser = {
          name: displayName, email, phoneNumber, photoUrl, uid,
        };
        this.setState({ user: newUser });
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    });
  }

  logOut() {
    this.setState({ user: {} });
    localStorage.removeItem('user');
  }

  render() {
    const { locale, changeLocale } = this.props;
    const { user } = this.state;
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/tutorial" component={Tutorial} />
              <Route path="/singleplayer" render={() => <Game ai />} />
              <Route path="/multiplayer" render={() => <Game />} />
              { Object.keys(user).length === 0 ? (
                <Route path="/login" component={Login} />
              ) : (
                <Route
                  path="/login"
                  render={({ history }) => (
                    <GameMenu
                      logOut={this.logOut}
                      user={user}
                      history={history}
                    />
                  )}
                />
              )
              }
              <Route
                path="/online"
                render={({ history }) => (
                  <GameMenu
                    logOut={this.logOut}
                    user={user}
                    history={history}
                  />
                )}
              />
              <Route
                path="/language"
                render={({ history }) => (
                  <LanguagePage
                    locale={locale}
                    changeLocale={changeLocale}
                    history={history}
                  />
                )}
              />
            </Switch>
            <LanguageFooter locale={locale} />
          </React.Fragment>
        </Router>
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Layout;
