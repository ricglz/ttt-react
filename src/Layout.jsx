import React, { Component } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import LanguageFooter from "./components/Layout/LanguageFooter";
import "./css/bootstrap.css";
import "./css/home.css";
import "./css/board.css";
import "./css/fonts.css";
import Tutorial from "./components/Tutorial/Tutorial";
import LanguagePage from "./components/Languages/LanguagePage";

class Layout extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = this.originalState();
    this.changeToAi = this.changeToAi.bind(this);
    this.changeToHome = this.changeToHome.bind(this);
    this.changeToPvp = this.changeToPvp.bind(this);
    this.changeToTutorial = this.changeToTutorial.bind(this);
    this.changeToLanguage = this.changeToLanguage.bind(this);
    this.changeLocale = this.changeLocale.bind(this);
  }

  changeToAi() {
    this.setState({
      ai: true
    });
  }

  changeToPvp() {
    this.setState({
      pvp: true
    });
  }

  changeToTutorial() {
    this.setState({
      tutorial: true
    });
  }

  changeToLanguage() {
    this.setState({
      language: true
    });
  }

  changeToHome() {
    this.setState(this.originalState);
  }

  changeLocale(locale) {
    this.props.changeLocale(locale);
    this.changeToHome();
  }

  originalState() {
    return {
      ai: false,
      pvp: false,
      tutorial: false,
      language: false
    };
  }

  returningComponent() {
    if (this.state.ai) {
      return <Game ai={true} back={this.changeToHome} />;
    }
    if (this.state.pvp) {
      return <Game ai={false} back={this.changeToHome} />;
    }
    if (this.state.tutorial) {
      return <Tutorial back={this.changeToHome} />;
    }
    if (this.state.language) {
      return (
        <LanguagePage
          locale={this.props.locale}
          changeLocale={this.changeLocale}
        />
      );
    }
    return (
      <Home
        changeToAi={this.changeToAi}
        changeToPvp={this.changeToPvp}
        changeToTutorial={this.changeToTutorial}
      />
    );
  }

  render() {
    return (
      <div>
        {this.returningComponent()}
        <LanguageFooter
          locale={this.props.locale}
          changeToLanguage={this.changeToLanguage}
        />
        <NotificationContainer />
      </div>
    );
  }
}

//
export default Layout;
