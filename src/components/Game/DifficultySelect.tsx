import React from 'react';
import Select from 'react-select';
import type { ActionMeta, SingleValue } from 'react-select';
import { FormattedMessage } from 'react-intl';

import type { Difficulty } from '../../@types/general_enums';

export type Option = {
  label: object,
  value: Difficulty,
};

const easy = <FormattedMessage id="game.easy" defaultMessage="Easy" />;
const medium = <FormattedMessage id="game.medium" defaultMessage="Medium" />;
const hard = <FormattedMessage id="game.hard" defaultMessage="Hard" />;
const options: Option[] = [
  { value: 1, label: easy },
  { value: 2, label: medium },
  { value: 3, label: hard },
];
const placeholder = (
  <FormattedMessage
    id="game.placeholder"
    defaultMessage="Choose the difficulty (Default easy)"
  />
);

type Props = {
  selectedOption: Option | null,
  handleChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void,
};

const DifficultySelect = ({ selectedOption, handleChange }: Props) => (
  <div className="row justify-content-center mb-3">
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
      <Select
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  </div>
);

export default DifficultySelect;
