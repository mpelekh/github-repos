import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GithubService } from './github.service';
import { mockResponsesByUrl } from '../../test/mocks/mock-responses';
import { of } from 'rxjs';

describe('GithubService', () => {
  let githubService: GithubService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [GithubService],
    }).compile();

    githubService = module.get<GithubService>(GithubService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(githubService).toBeDefined();
  });

  it('should call the HttpClient.get() method with appropriate arguments to return the result', async () => {
    jest.spyOn(httpService, 'get').mockImplementation((url: string) => {
      return of(mockResponsesByUrl[url]);
    });

    await githubService.findAllByUserName('username');

    const headers = GithubService.HEADERS;

    expect(httpService.get).toHaveBeenNthCalledWith(
      1,
      'https://api.github.com/users/username/repos',
      { headers },
    );
    expect(httpService.get).toHaveBeenNthCalledWith(
      2,
      'https://api.github.com/users/username/repos?page=2',
      { headers },
    );
    expect(httpService.get).toHaveBeenNthCalledWith(
      3,
      'https://api.github.com/repos/username/repo1/branches',
      { headers },
    );
    expect(httpService.get).toHaveBeenNthCalledWith(
      4,
      'https://api.github.com/repos/username/repo3/branches',
      { headers },
    );
  });

  it('should return an empty array if user has only forks', async () => {
    jest.spyOn(httpService, 'get').mockImplementation((url: string) => {
      return of(mockResponsesByUrl[url]);
    });

    const result = await githubService.findAllByUserName(
      'username_with_forks_only',
    );

    expect(result).toStrictEqual([]);
  });

  it("should return an empty array if user hasn't any repo", async () => {
    jest.spyOn(httpService, 'get').mockImplementation((url: string) => {
      return of(mockResponsesByUrl[url]);
    });

    const result = await githubService.findAllByUserName(
      'username_without_any_repo',
    );

    expect(result).toStrictEqual([]);
  });
});
