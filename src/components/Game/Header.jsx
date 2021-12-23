import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FormattedHeader, FormattedHeader2 } from '../Layout/FormattedText';

const Score = ({ score, klass, defaultMessage }) => (
  <div className={`col ${klass}`}>
    <p>
      <FormattedMessage id={`game.${klass}`} default={defaultMessage} />
      {` ${score}`}
    </p>
  </div>
);

const ScoresSection = ({ xScore, oScore }) => (
  <div className="col-12">
    <div className="row justify-content-between">
      <Score score={xScore} klass="x-score" defaultMessage="X's score" />
      <Score score={oScore} klass="o-score" defaultMessage="O's score" />
    </div>
  </div>
);

const Header = ({ xScore, oScore, ai }) => (
  <div className="row">
    <div className="col-12">
      <FormattedHeader locale={ai ? 'shared.sp' : 'shared.mp'} default="Type of game" />
    </div>
    <div className="col-12">
      <FormattedHeader2 locale="game.score" default="Score" />
    </div>
    <ScoresSection xScore={xScore} oScore={oScore} />
  </div>
);

Score.propTypes = {
  score: PropTypes.number.isRequired,
  klass: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
};

ScoresSection.propTypes = {
  oScore: PropTypes.number.isRequired,
  xScore: PropTypes.number.isRequired,
};

Header.propTypes = {
  ai: PropTypes.bool.isRequired,
  oScore: PropTypes.number.isRequired,
  xScore: PropTypes.number.isRequired,
};

export default Header;
