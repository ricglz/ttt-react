import React from 'react';
import type { Locale } from 'react-i18next';
import { FormattedMessage } from './FormattedText';

type Props = {
  onClick: () => void;
  text: Locale;
};

const DefaultButton = ({ onClick, text }: Props) => (
  <div className="col">
    <button
      type="button"
      className="btn btn-game btn-lg btn-danger"
      onClick={onClick}
    >
      <FormattedMessage locale={text} />
    </button>
  </div>
);

export default DefaultButton;
