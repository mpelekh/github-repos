import { ApiProperty } from '@nestjs/swagger';

export class Branch {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lastCommitSha: string;

  constructor(name: string, lastCommitSha: string) {
    this.name = name;
    this.lastCommitSha = lastCommitSha;
  }
}
