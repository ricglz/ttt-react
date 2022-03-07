import Select from 'react-select';
import type { ActionMeta, SingleValue } from 'react-select';

import type { Difficulty } from '../../@types/general_enums';
import { FormattedMessage } from '../Layout/FormattedText';

export type Option = {
  label: object;
  value: Difficulty;
};

const easy = <FormattedMessage locale="game.easy" />;
const medium = <FormattedMessage locale="game.medium" />;
const hard = <FormattedMessage locale="game.hard" />;
const options: Option[] = [
  { value: 1, label: easy },
  { value: 2, label: medium },
  { value: 3, label: hard },
];
const placeholder = <FormattedMessage locale="game.placeholder" />;

type Props = {
  selectedOption: Option | null;
  handleChange: (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
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
