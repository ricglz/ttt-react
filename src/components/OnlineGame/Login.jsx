import React from 'react';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { firebaseAuth } from '../../firebase/firebase';

const Login = () => (
  <div className="row h-100 justify-content-center align-items-center">
    <GoogleButton onClick={firebaseAuth} />
    <Link className="ml-5 btn btn-danger" to="/">
      <FormattedMessage id="shared.back" default="Back" />
    </Link>
  </div>
);

export default Login;
