import { GithubService } from '../../src/github/github.service';

export const mockResponsesByUrl: { [k: string]: any } = {
  [`${GithubService.BASE_URL}/users/username/repos`]: {
    headers: {
      link: `<${GithubService.BASE_URL}/users/username/repos?page=2>; rel="next", <${GithubService.BASE_URL}/users/username/repos?page=2>; rel="last"`,
    },
    data: [
      { name: 'repo1', owner: { login: 'login1' }, fork: false },
      { name: 'repo2', owner: { login: 'login2' }, fork: true },
    ],
  },
  [`${GithubService.BASE_URL}/users/username/repos?page=2`]: {
    headers: {
      link: `<${GithubService.BASE_URL}/users/username/repos?page=1>; rel="prev", <${GithubService.BASE_URL}/users/username/repos?page=1>; rel="first"`,
    },
    data: [{ name: 'repo3', owner: { login: 'login3' }, fork: false }],
  },
  [`${GithubService.BASE_URL}/repos/username/repo1/branches`]: {
    headers: {},
    data: [
      { name: 'branch1', commit: { sha: 'sha1' } },
      { name: 'branch2', commit: { sha: 'sha2' } },
    ],
  },
  [`${GithubService.BASE_URL}/repos/username/repo3/branches`]: {
    headers: {},
    data: [{ name: 'branch11', commit: { sha: 'sha11' } }],
  },
  [`${GithubService.BASE_URL}/users/username_with_forks_only/repos`]: {
    headers: {},
    data: [
      { name: 'repo1', owner: { login: 'login1' }, fork: true },
      { name: 'repo2', owner: { login: 'login2' }, fork: true },
    ],
  },
  [`${GithubService.BASE_URL}/users/username_without_any_repo/repos`]: {
    headers: {},
    data: [],
  },
};
