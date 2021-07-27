import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from './github.service';

@Module({
  imports: [HttpModule],
  providers: [GithubService],
})
export class GithubModule {}
