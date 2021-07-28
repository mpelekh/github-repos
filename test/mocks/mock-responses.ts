import { GithubService } from '../../src/github/github.service';

export const mockResponsesByUrl: { [k: string]: any } = {
  [`${GithubService.BASE_URL}/users/username/repos`]: {
    headers: {},
    data: [
      { name: 'repo1', owner: { login: 'login1' }, fork: false },
      { name: 'repo2', owner: { login: 'login2' }, fork: true },
      { name: 'repo3', owner: { login: 'login3' }, fork: false },
    ],
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
};
