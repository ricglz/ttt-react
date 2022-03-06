import React from 'react';
import type { Locale } from 'react-i18next';
import {
  FormattedHeader,
  FormattedHeader2,
  FormattedMessage,
} from '../Layout/FormattedText';

type ScoreProps = {
  score: number;
  klass: string;
};

const Score = ({ score, klass }: ScoreProps) => (
  <div className={`col ${klass}`}>
    <p>
      <FormattedMessage locale={`game.${klass}` as Locale} />
      {` ${score}`}
    </p>
  </div>
);

interface ScoresSectionProps {
  xScore: number;
  oScore: number;
}

const ScoresSection = ({ xScore, oScore }: ScoresSectionProps) => (
  <div className="col-12">
    <div className="row justify-content-between">
      <Score score={xScore} klass="x-score" />
      <Score score={oScore} klass="o-score" />
    </div>
  </div>
);

interface Props extends ScoresSectionProps {
  ai: boolean;
}

const Header = ({ xScore, oScore, ai }: Props) => (
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

export default Header;
