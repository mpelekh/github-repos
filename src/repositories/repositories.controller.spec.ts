import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { GithubService } from '../github/github.service';

describe('RepositoriesController', () => {
  let githubServiceMockImplementation;
  let controller: RepositoriesController;

  beforeEach(async () => {
    githubServiceMockImplementation = {
      findAllByUserName: jest.fn(() => Promise.resolve([])),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        { provide: GithubService, useValue: githubServiceMockImplementation },
      ],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the githubService.findAllByUserName() method with the appropriate parameter', async () => {
      await controller.findAll('username');

      expect(githubServiceMockImplementation.findAllByUserName).toBeCalledTimes(
        1,
      );
      expect(githubServiceMockImplementation.findAllByUserName).toBeCalledWith(
        'username',
      );
    });
    it('should return an array of repositories', async () => {
      expect(await controller.findAll('username')).toEqual([]);
    });
  });
});
