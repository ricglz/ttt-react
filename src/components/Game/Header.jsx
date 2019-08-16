import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FormattedHeader, FormattedHeader2 } from '../Layout/FormattedText';

const XScoreMessage = React.useMemo(
  () => <FormattedMessage id="game.xScore" default="X's score" />,
  [],
);
const OScoreMessage = React.useMemo(
  () => <FormattedMessage id="game.oScore" default="O's score" />,
  [],
);

const Score = ({ score, klass, Component }) => (
  <div className={`col ${klass}`}>
    <p>
      <Component />
      {` ${score}`}
    </p>
  </div>
);

const ScoresSection = ({ xScore, oScore }) => (
  <div className="col-12">
    <div className="row justify-content-between">
      <Score score={xScore} klass="xScore" Component={XScoreMessage} />
      <Score score={oScore} klass="oScore" Component={OScoreMessage} />
    </div>
  </div>
);

const Header = ({ xScore, oScore, ai }) => (
  <div className="row">
    <div className="col-12">
      <FormattedHeader locale={ai ? 'shared.sp' : 'shared.mp'} />
    </div>
    <div className="col-12">
      <FormattedHeader2 locale="game.score" />
    </div>
    <ScoresSection xScore={xScore} oScore={oScore} />
  </div>
);

Score.propTypes = {
  score: PropTypes.number.isRequired,
  klass: PropTypes.string.isRequired,
  Component: PropTypes.element.isRequired,
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
