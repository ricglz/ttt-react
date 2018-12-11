import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FormattedHeader, FormattedHeader2 } from '../Layout/FormattedText';

const xScoreMessage = <FormattedMessage id="game.xScore" default="X's score" />;
const oScoreMessage = <FormattedMessage id="game.oScore" default="O's score" />;

const Header = ({ xScore, oScore, ai }) => (
  <div className="row">
    <div className="col-12">
      <FormattedHeader locale={ai ? 'shared.sp' : 'shared.mp'} />
    </div>
    <div className="col-12">
      <FormattedHeader2 locale="game.score" />
    </div>
    <div className="col-12">
      <div className="row justify-content-between">
        <div className="col xScore">
          <p>
            {xScoreMessage}
            {` ${xScore}`}
          </p>
        </div>
        <div className="col oScore">
          <p>
            {oScoreMessage}
            {` ${oScore}`}
          </p>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  ai: PropTypes.bool.isRequired,
  oScore: PropTypes.number.isRequired,
  xScore: PropTypes.number.isRequired,
};

export default Header;
