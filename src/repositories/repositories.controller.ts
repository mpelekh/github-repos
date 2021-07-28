import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GithubService } from '../github/github.service';
import { Repository } from './entities';
import { FindAllParams } from './validators/find-all-params';

@ApiTags('repos')
@Controller('users/:username/repos')
export class RepositoriesController {
  constructor(private readonly repositoriesService: GithubService) {}

  @ApiOkResponse({
    description: "Retrieved user's repositories successfully",
    type: [Repository],
  })
  @ApiBadRequestResponse({
    description: 'The provided username is invalid',
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
  findAll(@Param() params: FindAllParams): Promise<Repository[]> {
    return this.repositoriesService.findAllByUserName(params.username);
  }
}
