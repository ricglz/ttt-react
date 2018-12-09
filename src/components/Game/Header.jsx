import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedHeader, FormattedHeader2 } from '../Layout/FormattedText';

const xScore = <FormattedMessage id="game.xScore" default="X's score" />;
const oScore = <FormattedMessage id="game.oScore" default="O's score" />;

function renderName(isAi) {
  if (isAi) {
    return <FormattedHeader locale="shared.sp" />;
  }
  return <FormattedHeader locale="shared.mp" />;
}

const Header = props => (
  <div className="row">
    <div className="col-12">{renderName(props.ai)}</div>
    <div className="col-12">
      <FormattedHeader2 locale="game.score" />
    </div>
    <div className="col-12">
      <div className="row justify-content-between">
        <div className="col xScore">
          <p>
            {xScore}
:
            {props.xScore}
          </p>
        </div>
        <div className="col oScore">
          <p>
            {oScore}
:
            {props.oScore}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
