import React from 'react';
import { FormattedMessage } from 'react-intl';

type Props = {
  onClick: () => void,
  text: string,
  defaultText: string,
};

const DefaultButton = ({ onClick, text, defaultText }: Props) => (
  <div className="col">
    <button
      type="button"
      className="btn btn-game btn-lg btn-danger"
      onClick={onClick}
    >
      <FormattedMessage id={text} defaultMessage={defaultText} />
    </button>
  </div>
);

export default DefaultButton;
