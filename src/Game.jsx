import React, { Component } from 'react';
import Header from './Header';
import BigBoard from './BigBoard';
import ButtonsFooter from './ButtonsFooter';

class App extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="container text-center">
        <Header/>
        <hr/>
        <BigBoard/>
        <hr/>
        <ButtonsFooter
          back={this.props.back}
        />
      </div>
    );
  }
}

export default App;
