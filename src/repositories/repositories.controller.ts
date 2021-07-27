import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { Repository } from './entities';

@Controller('users/:username/repos')
export class RepositoriesController {
  constructor(private readonly repositoriesService: GithubService) {}

  @Get()
  findAll(@Param('username') userName: string): Promise<Repository[]> {
    return this.repositoriesService.findAllByUserName(userName);
  }
}
