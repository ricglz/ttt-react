import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import Login from './components/OnlineGame/Login';
import Tutorial from './components/Tutorial/Tutorial';
import LanguageFooter from './components/Layout/LanguageFooter';
import LanguagePage from './components/Languages/LanguagePage';
import { layoutOriginalState } from './functions/HelperFunctions';
import './css/bootstrap.css';
import './css/home.css';
import './css/board.css';
import './css/fonts.css';
import './css/everything.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = layoutOriginalState();
    this.changeLocale = this.changeLocale.bind(this);
  }

  changeToHome() {
    this.setState(layoutOriginalState());
  }

  changeLocale(locale) {
    const { changeLocale } = this.props;
    changeLocale(locale);
    this.changeToHome();
  }

  render() {
    const { locale, changeLocale } = this.props;
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/tutorial" component={Tutorial} />
              <Route path="/singleplayer" render={() => <Game ai />} />
              <Route path="/multiplayer" render={() => <Game />} />
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
      </React.Fragment >
    );
  }
}

Layout.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Layout;
