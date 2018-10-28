import React, { Component } from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import pt from "react-intl/locale-data/pt";
import ar from "react-intl/locale-data/ar";
import Messages from "./messages/Messages";
import Layout from "./Layout";

addLocaleData([...en, ...fr, ...es, ...pt, ...ar]);

class App extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = this.originalState();
    this.changeLocale = this.changeLocale.bind(this);
    this.getDirection = this.getDirection.bind(this);
  }

  changeLocale(newLocale) {
    this.setState({
      locale: newLocale
    });
  }

  originalState() {
    return {
      locale: "en"
    };
  }

  getDirection() {
    return this.state.locale === 'ar' ? 'rtl' : 'ltr';
  }

  getLocaleClass() {
    return this.state.locale === 'ar' ? 'text-right' : 'text-left';
  }

  render() {
    return (
      <IntlProvider
        locale={this.state.locale}
        messages={Messages[this.state.locale]}
      >
        <div dir={this.getDirection()} className={this.getLocaleClass()}>
          <Layout changeLocale={this.changeLocale} locale={this.state.locale} />
        </div>
      </IntlProvider>
    );
  }
}

//
export default App;
