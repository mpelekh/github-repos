import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AppModule } from '../src/app.module';
import { mockResponsesByUrl } from './mocks/mock-responses';

describe('RepositoriesController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpService = moduleFixture.get<HttpService>(HttpService);
  });

  it('/users/:username/repos (GET) - should return HTTP 406', () => {
    return request(app.getHttpServer())
      .get('/users/username/repos')
      .set({ Accept: 'application/xml' })
      .expect(HttpStatus.NOT_ACCEPTABLE)
      .expect({
        status: HttpStatus.NOT_ACCEPTABLE,
        Message: 'The only accepted content type is "application/json"',
      });
  });

  it("/users/:username/repos (GET) - should return HTTP 404 if such user doesn't exist", () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
      return throwError(
        new HttpException(
          { status: HttpStatus.NOT_FOUND },
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    return request(app.getHttpServer())
      .get('/users/username/repos')
      .expect(404)
      .expect({
        status: 404,
        Message: `The user with "username" username doesn\'t exist`,
      });
  });

  it('/users/:username/repos (GET) - should return HTTP 200', () => {
    jest.spyOn(httpService, 'get').mockImplementation((url: string) => {
      return of(mockResponsesByUrl[url]);
    });

    return request(app.getHttpServer())
      .get('/users/username/repos')
      .expect(200)
      .expect(
        JSON.stringify([
          {
            name: 'repo1',
            owner: 'login1',
            branches: [
              { name: 'branch1', lastCommitSha: 'sha1' },
              { name: 'branch2', lastCommitSha: 'sha2' },
            ],
          },
          {
            name: 'repo3',
            owner: 'login3',
            branches: [{ name: 'branch11', lastCommitSha: 'sha11' }],
          },
        ]),
      );
  });
});
