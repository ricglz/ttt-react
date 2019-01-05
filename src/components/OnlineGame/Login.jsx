import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { firebaseAuth } from '../../firebase/firebase';
import { userPropType } from '../../constants/props';
import GameMenu from './GameMenu';

const Login = () => (
  <div className="row h-100 justify-content-center align-items-center">
    <GoogleButton onClick={firebaseAuth} />
    <Link className="ml-5 btn btn-danger" to="/">
      <FormattedMessage id="shared.back" default="Back" />
    </Link>
  </div>
);

export default Login;
