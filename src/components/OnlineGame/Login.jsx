import React from 'react';
import PropTypes from 'prop-types';
import { firebaseAuth } from '../../firebase/firebase'
// import Game from './Game'

class Login extends React.Component {
  constructor(props) {
    super(props);

    const cachedUser = localStorage.getItem('user');
    const user = cachedUser ? JSON.parse(cachedUser) : null;

    this.state = { user };
    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    const that = this;
    firebaseAuth().then(function(result) {
      var token = result.credential.accessToken;
      let {
        displayName, email, phoneNumber, photoUrl, uid
      } = result.user;
      let user = {
        name: displayName, email, phoneNumber, photoUrl, uid
      };
      that.setState(user);
      localStorage.setItem('user', JSON.stringify(user));
    }).catch(function(error) {
      alert(error.message);
    });
  }

  render() {
    const { user } = this.state
    return (
      <React.Fragment>
      { user ? (
        <span> yei </span>
        ) : (
        <div className="row h-100 justify-content-center align-items-center">
          <button onClick={() => this.logIn()}> Log in plox </button>
        </div>
      )}
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }),
}

export default Login;
