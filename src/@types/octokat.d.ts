declare module 'octokat' {

  type SearchResult<T> = {
    items: T[]
  };
  export type RepoContributors = {
    readonly login: string
    readonly avatarUrl: string
    readonly htmlUrl: string
  }
  type ContributorObject = {
    fetch: () => Promise<SearchResult<RepoContributors>>
  };
  type Repos = {
    contributors: ContributorObject
  };
  export default class Octokat {
    constructor();
    repos: (user: string, repo: string) => Repos;
  };
}
