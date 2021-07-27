import { Branch } from './branch.entity';

export class Repository {
  constructor(
    public name: string,
    public owner: string,
    public branches: Branch[],
  ) {}
}
