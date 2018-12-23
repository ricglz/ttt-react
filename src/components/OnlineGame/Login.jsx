import React from 'react';
import PropTypes from 'prop-types';
import { firebaseAuth } from '../../firebase/firebase'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  logIn() {
    firebaseAuth().then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      let {
        displayName, email, metadata, phoneNumber, photoUrl, uid
      } = result.user;
      let user = {
        name: displayName, email, metadata, phoneNumber, photoUrl, uid
      };
      console.log(user);
    }).catch(function(error) {
      alert(error.message);
    });
  }

  render() {
    return (
      <button onClick={() => this.logIn()}> Log in plox </button>
    )
  }
}

export default Login;
