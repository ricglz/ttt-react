import React, { useState, useCallback } from 'react';
import { IntlProvider } from 'react-intl';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import messages from './messages';

type Locale = string;

function getDirection(locale: Locale) {
  return locale === 'ar' ? ['rtl', 'text-right'] : ['ltr', 'text-left'];
}

type ChildrenComponentProps = {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};

type Props = {
  ChildrenComponent: React.FC<ChildrenComponentProps>;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RouterComponent?: any;
};

export default function ContextsProvider({
  children,
  ChildrenComponent,
  RouterComponent = Router,
}: Props) {
  const [locale, setLocale] = useState<Locale>('en');

  const changeLocale = useCallback((newLocale) => {
    setLocale(newLocale);
  }, []);

  const [direction, klass] = getDirection(locale);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div dir={direction} className={klass}>
        <RouterComponent>
          <ChildrenComponent changeLocale={changeLocale} locale={locale} />
          {children}
        </RouterComponent>
        <NotificationContainer />
      </div>
    </IntlProvider>
  );
}
