import { ApiProperty } from '@nestjs/swagger';
import { Branch } from './branch.entity';

export class Repository {
  @ApiProperty()
  name: string;

  @ApiProperty()
  owner: string;

  @ApiProperty({
    type: [Branch],
  })
  branches: Branch[];

  constructor(name: string, owner: string, branches: Branch[]) {
    this.name = name;
    this.owner = owner;
    this.branches = branches;
  }
}
