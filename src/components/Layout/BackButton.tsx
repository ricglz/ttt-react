import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

type Props = {
  text: string,
  url: string,
};

const BackButton = ({ text, url }: Props) => (
  <div className="col">
    <Link className="btn btn-game btn-lg btn-danger" to={url}>
      <FormattedMessage id={text} defaultMessage="Back" />
    </Link>
  </div>
);

export default BackButton;
