import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export const FormattedParagraph = ({ locale }) => (
  <p>
    <FormattedMessage id={locale} />
  </p>
);

FormattedParagraph.propTypes = {
  locale: PropTypes.string.isRequired,
};

export const FormattedHeader = ({ locale }) => (
  <FormattedMessage id={locale}>
    {txt => <h1>{txt}</h1>}
  </FormattedMessage>
);

FormattedHeader.propTypes = {
  locale: PropTypes.string.isRequired,
};

export const FormattedHeader2 = ({ locale }) => (
  <h2>
    <FormattedMessage id={locale} />
  </h2>
);

FormattedHeader2.propTypes = {
  locale: PropTypes.string.isRequired,
};
