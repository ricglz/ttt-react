import React, { Component } from 'react'
import Select from 'react-select';

const options = [
  { value: 1, label: 'Easy'},
  { value: 2, label: 'Medium'},
  { value: 3, label: 'Hard'}
]

class DifficultySelect extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <Select
            placeholder="Choose the difficulty (Default easy)"
            value={this.props.selectedOption}
            onChange={this.props.handleChange}
            options={options}
          />
        </div>
      </div>
    );
  }
}

export default DifficultySelect;