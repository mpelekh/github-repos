import { IsAscii } from 'class-validator';

export class FindAllParams {
  @IsAscii()
  username: string;
}
