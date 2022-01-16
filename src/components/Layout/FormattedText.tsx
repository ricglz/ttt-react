import React from 'react';
import { FormattedMessage } from 'react-intl';

type SharedProps = {
  locale: string,
  defaultMessage?: string,
};

export const FormattedParagraph = ({ locale }: SharedProps) => (
  <p>
    <FormattedMessage id={locale} />
  </p>
);

export const FormattedHeader = ({ locale, defaultMessage }: SharedProps) => (
  <FormattedMessage id={locale} defaultMessage={defaultMessage}>
    {(txt) => <h1>{txt}</h1>}
  </FormattedMessage>
);

export const FormattedHeader2 = ({ locale }: SharedProps) => (
  <h2>
    <FormattedMessage id={locale} />
  </h2>
);
