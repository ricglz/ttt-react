import type { Locale } from 'react-i18next';
import { useTranslation } from 'react-i18next';

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
