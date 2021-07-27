import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RepositoriesController } from './repositories.controller';
import { GithubModule } from '../github/github.module';
import { GithubService } from '../github/github.service';

@Module({
  imports: [HttpModule, GithubModule],
  controllers: [RepositoriesController],
  providers: [GithubService],
})
export class RepositoriesModule {}
