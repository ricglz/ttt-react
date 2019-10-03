import React, { useState, useCallback } from 'react';
import { IntlProvider } from 'react-intl';
import Messages from './messages/Messages';
import Layout from './Layout';

function getDirection(locale) {
  return locale === 'ar' ? ['rtl', 'text-right'] : ['ltr', 'text-left'];
}

function App() {
  const [locale, setLocale] = useState('en');

  const changeLocale = useCallback(
    (newLocale) => {
      setLocale(newLocale);
    },
    [],
  );

  const [direction, klass] = getDirection(locale);

  return (
    <IntlProvider locale={locale} messages={Messages[locale]}>
      <div dir={direction} className={klass}>
        <Layout changeLocale={changeLocale} locale={locale} />
      </div>
    </IntlProvider>
  );
}

export default App;
