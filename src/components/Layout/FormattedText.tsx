import React from 'react';
import type { Locale } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import MESSAGES from '../../messages';

i18n.use(initReactI18next).init({
  resources: MESSAGES,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

type SharedProps = {
  locale: Locale;
};

export const FormattedMessage = ({ locale }: SharedProps) => {
  const { t } = useTranslation();
  return <>{t(locale)}</>;
};

export const FormattedParagraph = (props: SharedProps) => (
  <p>
    <FormattedMessage {...props} />
  </p>
);

export const FormattedHeader = (props: SharedProps) => (
  <h1>
    <FormattedMessage {...props} />
  </h1>
);

export const FormattedHeader2 = (props: SharedProps) => (
  <h2>
    <FormattedMessage {...props} />
  </h2>
);
