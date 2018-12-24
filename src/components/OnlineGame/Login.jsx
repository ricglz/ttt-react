import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import GoogleButton from 'react-google-button';
import { firebaseAuth } from '../../firebase/firebase';
import GameMenu from './GameMenu';

class Login extends React.Component {
  constructor(props) {
    super(props);

    const cachedUser = localStorage.getItem('user');
    const user = cachedUser ? JSON.parse(cachedUser) : null;

    this.state = { user };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn() {
    const that = this;
    firebaseAuth().then((result) => {
      const {
        displayName, email, phoneNumber, photoUrl, uid,
      } = result.user;
      const user = {
        name: displayName, email, phoneNumber, photoUrl, uid,
      };
      that.setState({ user });
      localStorage.setItem('user', JSON.stringify(user));
    }).catch((error) => {
      NotificationManager.error(error.message);
    });
  }

  logOut() {
    this.setState({ user: null });
    localStorage.removeItem('user');
  }

  render() {
    const { user } = this.state;
    const { back } = this.props;
    return (
      <React.Fragment>
        { user ? (
          <GameMenu user={user} logOut={this.logOut} />
        ) : (
          <div className="row h-100 justify-content-center align-items-center">
            <GoogleButton onClick={() => this.logIn()} />
            <button className="ml-5 btn btn-danger" type="button" onClick={() => back()}>Back</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  back: PropTypes.func.isRequired,
};

export default Login;
