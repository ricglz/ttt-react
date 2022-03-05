import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { firebaseAuth } from '../../firebase/firebase';
import GoogleButton from '../Login/GoogleButton';

const Login = () => (
  <div className="row h-100 justify-content-center align-items-center">
    <GoogleButton onClick={firebaseAuth} />
    <Link className="ml-5 btn btn-danger" to="/">
      <FormattedMessage id="shared.back" defaultMessage="Back" />
    </Link>
  </div>
);

export default Login;
