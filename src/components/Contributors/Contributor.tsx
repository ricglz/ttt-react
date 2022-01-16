import type { RepoContributors } from 'octokat';
import React from 'react';
import '../../css/contributor.css';

const Contributor = ({ login, htmlUrl, avatarUrl }: RepoContributors) => (
  <li className="contributor">
    <a className="avatar" href={htmlUrl} title={login}>
      <img className="img-fluid" alt={login} src={avatarUrl} />
      <span className="contributor-name">{login}</span>
    </a>
  </li>
);

export default Contributor;
