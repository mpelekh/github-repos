import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GithubService } from '../github/github.service';
import { Repository } from './entities';

@ApiTags('repos')
@Controller('users/:username/repos')
export class RepositoriesController {
  constructor(private readonly repositoriesService: GithubService) {}

  @ApiOkResponse({
    description: "Retrieved user's repositories successfully",
    type: [Repository],
  })
  @ApiNotFoundResponse({
    description: "The user with provided username doesn't exist",
  })
  @ApiNotAcceptableResponse({
    description: 'The only acceptable content type is "application/json"',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  findAll(@Param('username') userName: string): Promise<Repository[]> {
    return this.repositoriesService.findAllByUserName(userName);
  }
}
