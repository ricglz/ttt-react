import React from 'react';
import '../../css/contributor.css';
import { contributorProps } from '../../constants/props';

const Contributor = ({ login, htmlUrl, avatarUrl }) => (
  <li className="contributor">
    <a className="avatar" href={htmlUrl} title={login}>
      <img className="img-fluid" alt={login} src={avatarUrl} />
      <span className="contributor-name">{login}</span>
    </a>
  </li>
);

Contributor.propTypes = contributorProps;

export default Contributor;
