import '../../css/contributor.css';

export type ContributorType = {
  readonly avatar_url?: string;
  readonly html_url?: string;
  readonly login?: string;
};

const Contributor = ({ avatar_url, html_url, login }: ContributorType) => (
  <li className="contributor">
    <a className="avatar" href={html_url} title={login}>
      <img className="img-fluid" alt={login} src={avatar_url} />
      <span className="contributor-name">{login}</span>
    </a>
  </li>
);

export default Contributor;
