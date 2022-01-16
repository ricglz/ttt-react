import React, { useState, useCallback } from 'react';
import { IntlProvider } from 'react-intl';
import messages from './messages';
import Layout from './Layout';

function getDirection(locale: string) {
  return locale === 'ar' ? ['rtl', 'text-right'] : ['ltr', 'text-left'];
}

function App() {
  const [locale, setLocale] = useState('en');

  const changeLocale = useCallback((newLocale) => {
    setLocale(newLocale);
  }, []);

  const [direction, klass] = getDirection(locale);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div dir={direction} className={klass}>
        <Layout changeLocale={changeLocale} locale={locale} />
      </div>
    </IntlProvider>
  );
}

export default App;
