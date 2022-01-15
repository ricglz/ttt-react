import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedHeader, FormattedHeader2 } from '../Layout/FormattedText';

type ScoreProps = {
  score: number,
  klass: string,
  defaultMessage: string,
};

const Score = ({ score, klass, defaultMessage }: ScoreProps) => (
  <div className={`col ${klass}`}>
    <p>
      <FormattedMessage id={`game.${klass}`} defaultMessage={defaultMessage} />
      {` ${score}`}
    </p>
  </div>
);

interface ScoresSectionProps {
  xScore: number,
  oScore: number,
}

const ScoresSection = ({ xScore, oScore }: ScoresSectionProps) => (
  <div className="col-12">
    <div className="row justify-content-between">
      <Score score={xScore} klass="x-score" defaultMessage="X's score" />
      <Score score={oScore} klass="o-score" defaultMessage="O's score" />
    </div>
  </div>
);

interface Props extends ScoresSectionProps {
  ai: boolean
}

const Header = ({ xScore, oScore, ai }: Props) => (
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

export default Header;
