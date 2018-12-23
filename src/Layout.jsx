import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PropTypes from 'prop-types';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import OnlineGame from './components/OnlineGame/OnlineGame';
import Tutorial from './components/Tutorial/Tutorial';
import LanguageFooter from './components/Layout/LanguageFooter';
import LanguagePage from './components/Languages/LanguagePage';
import { layoutOriginalState } from './functions/HelperFunctions';
import './css/bootstrap.css';
import './css/home.css';
import './css/board.css';
import './css/fonts.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = layoutOriginalState();
    this.changeToAi = this.changeToAi.bind(this);
    this.changeToHome = this.changeToHome.bind(this);
    this.changeToPvp = this.changeToPvp.bind(this);
    this.changeToOnline = this.changeToOnline.bind(this);
    this.changeToTutorial = this.changeToTutorial.bind(this);
    this.changeToLanguage = this.changeToLanguage.bind(this);
    this.changeLocale = this.changeLocale.bind(this);
  }

  changeToAi() {
    this.setState({
      ai: true,
    });
  }

  changeToPvp() {
    this.setState({
      pvp: true,
    });
  }

  changeToOnline() {
    this.setState({
      online: true,
    });
  }

  changeToTutorial() {
    this.setState({
      tutorial: true,
    });
  }

  changeToLanguage() {
    this.setState({
      language: true,
    });
  }

  changeToHome() {
    this.setState(layoutOriginalState());
  }

  changeLocale(locale) {
    const { changeLocale } = this.props;
    changeLocale(locale);
    this.changeToHome();
  }

  returningComponent() {
    const {
      ai, pvp, tutorial, language, online,
    } = this.state;

    if (ai) {
      return <Game ai back={this.changeToHome} />;
    }
    if (pvp) {
      return <Game ai={false} back={this.changeToHome} />;
    }
    if (online) {
      return <OnlineGame ai={false} back={this.changeToHome} />;
    }
    if (tutorial) {
      return <Tutorial back={this.changeToHome} />;
    }
    if (language) {
      const { locale } = this.props;
      return (
        <LanguagePage
          locale={locale}
          changeLocale={this.changeLocale}
        />
      );
    }
    return (
      <Home
        changeToOnline={this.changeToOnline}
        changeToAi={this.changeToAi}
        changeToPvp={this.changeToPvp}
        changeToTutorial={this.changeToTutorial}
      />
    );
  }

  render() {
    const { locale } = this.props;
    return (
      <div>
        {this.returningComponent()}
        <LanguageFooter
          locale={locale}
          changeToLanguage={this.changeToLanguage}
        />
        <NotificationContainer />
      </div>
    );
  }
}

Layout.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Layout;
