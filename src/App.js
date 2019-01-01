import React, { Component } from "react";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import pt from "react-intl/locale-data/pt";
import ar from "react-intl/locale-data/ar";
import uk from "react-intl/locale-data/uk";
import id from "react-intl/locale-data/id";
import sr from "react-intl/locale-data/sr";
import da from "react-intl/locale-data/da";
import ko from "react-intl/locale-data/ko";
import ja from "react-intl/locale-data/ja";
import mr from "react-intl/locale-data/mr";
import hi from "react-intl/locale-data/hi";
import it from "react-intl/locale-data/it";
import de from "react-intl/locale-data/de";
import ru from "react-intl/locale-data/ru";
import sv from "react-intl/locale-data/sv";
import zh from "react-intl/locale-data/zh";
import cs from "react-intl/locale-data/cs";
import ca from "react-intl/locale-data/ca";
import tr from "react-intl/locale-data/tr";
import Messages from "./messages/Messages";
import Layout from "./Layout";

addLocaleData(
  [...en, ...fr, ...es, ...pt, ...it, ...hi, ...mr, ...ko, ...ja, ...da,
   ...sr, ...id, ...uk, ...de, ...ru, ...sv, ...zh, ...ar, ...cs, ...tr,
   ...ca]
);

function getDirection(locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

function getLocaleClass(locale) {
  return locale === 'ar' ? 'text-right' : 'text-left';
}

function originalState() {
  return { locale: "en" };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = originalState();
    this.changeLocale = this.changeLocale.bind(this);
  }

  changeLocale(locale) {
    this.setState({ locale });
  }

  render() {
    const { locale } = this.state;
    return (
      <IntlProvider locale={locale} messages={Messages[locale]}>
        <div dir={getDirection(locale)} className={getLocaleClass(locale)}>
          <Layout changeLocale={this.changeLocale} locale={locale} />
        </div>
      </IntlProvider>
    );
  }
}

export default App;
