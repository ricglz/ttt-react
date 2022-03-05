import React from 'react';
import type { Locale } from 'react-i18next';
import { useTranslation } from 'react-i18next';

type Props = {
  onClick: () => void;
  text: Locale;
};

const DefaultButton = ({ onClick, text }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="col">
      <button
        type="button"
        className="btn btn-game btn-lg btn-danger"
        onClick={onClick}
      >
        {t(text)}
      </button>
    </div>
  );
};

export default DefaultButton;
