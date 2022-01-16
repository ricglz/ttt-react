import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

function renderText(staticText: boolean, text: string) {
  return staticText ? <span>{text}</span> : <FormattedMessage id={text} />;
}

type Props = {
  text: string,
  staticText?: boolean,
  url: string,
};

const HomeButton = ({ text, staticText = false, url }: Props) => (
  <div className="row justify-content-center border-top py-3">
    <Link className="btn btn-home" to={url}>{renderText(staticText, text)}</Link>
  </div>
);

export default HomeButton;
