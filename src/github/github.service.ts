import {
  catchError,
  concatMap,
  forkJoin,
  map,
  lastValueFrom,
  expand,
  EMPTY,
  reduce,
} from 'rxjs';
import * as parseLinkHeader from 'parse-link-header';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  Branch as GithubBranch,
  Repository as GithubRepository,
} from './types';
import { Branch, Repository } from '../repositories/entities';

@Injectable()
export class GithubService {
  public static BASE_URL = 'https://api.github.com';
  private static HEADERS = { Accept: 'application/vnd.github.v3+json' };

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAllByUserName(userName: string) {
    return lastValueFrom(
      this.fetch<GithubRepository[]>(
        `${GithubService.BASE_URL}/users/${userName}/repos`,
      ).pipe(
        catchError((error) => {
          if (error.response?.status === HttpStatus.NOT_FOUND) {
            throw new NotFoundException({
              status: HttpStatus.NOT_FOUND,
              Message: `The user with "${userName}" username doesn't exist`,
            });
          }

          throw new Error(error);
        }),
        expand((response) => {
          const next = parseLinkHeader(response.headers.link)?.next;
          return next
            ? this.fetch<GithubRepository[]>(next.url).pipe(
                catchError((error) => {
                  throw new Error(error);
                }),
              )
            : EMPTY;
        }),
        reduce((acc, response) => acc.concat(response.data), []),
        map((repos) => repos.filter((repo) => !repo.fork)),
        concatMap((repos) =>
          forkJoin(
            repos.map((repo) =>
              this.fetch<GithubBranch[]>(
                `${GithubService.BASE_URL}/repos/${userName}/${repo.name}/branches`,
              ).pipe(
                map((response) => response.data),
                map((branches) => this.mapRepository(repo, branches)),
                catchError((error) => {
                  throw new Error(error);
                }),
              ),
            ),
          ),
        ),
      ),
    );
  }

  private fetch<T>(url: string) {
    const authToken = this.configService.get<string>('GITHUB_AUTH_TOKEN');

    return this.httpService.get<T>(url, {
      headers: {
        ...(authToken ? { Authorization: `token ${authToken}` } : null),
        ...GithubService.HEADERS,
      },
    });
  }

  private mapRepository(
    repo: GithubRepository,
    branches: GithubBranch[],
  ): Repository {
    return new Repository(
      repo.name,
      repo.owner.login,
      branches.map(({ name, commit: { sha } }) => new Branch(name, sha)),
    );
  }
}
