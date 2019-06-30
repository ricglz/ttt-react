import React from 'react';
import PropTypes from 'prop-types';
import '../../css/contributor.css';

const Contributor = ({ login, htmlUrl, avatarUrl }) => (
  <li className="contributor">
    <a className="avatar" href={htmlUrl} title={login}>
      <img className="img-fluid" alt={login} src={avatarUrl} />
      <span className="contributor-name">{login}</span>
    </a>
  </li>
);

Contributor.propTypes = {
  login: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default Contributor;
