import React, { Component } from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import pt from "react-intl/locale-data/pt";
import uk from "react-intl/locale-data/uk";
import id from "react-intl/locale-data/id";
import sr from "react-intl/locale-data/sr";
import da from "react-intl/locale-data/da";
import ko from "react-intl/locale-data/ko";
import ja from "react-intl/locale-data/ja";
import mr from "react-intl/locale-data/mr";
import hi from "react-intl/locale-data/hi";
import it from "react-intl/locale-data/it";
import Messages from "./messages/Messages";
import Layout from "./Layout";

addLocaleData(
  [...en, ...fr, ...es, ...pt, ...it, ...hi, ...mr, ...ko, ...ja, ...da,
   ...sr, ...id, ...uk]
);

class App extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = this.originalState();
    this.changeLocale = this.changeLocale.bind(this);
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

  render() {
    return (
      <IntlProvider
        locale={this.state.locale}
        messages={Messages[this.state.locale]}
      >
        <Layout changeLocale={this.changeLocale} locale={this.state.locale} />
      </IntlProvider>
    );
  }
}

//
export default App;
