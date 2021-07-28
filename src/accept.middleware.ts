import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AcceptMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.format({
      json: () => next(),
      default: () => {
        throw new NotAcceptableException({
          status: HttpStatus.NOT_ACCEPTABLE,
          Message: 'The only accepted content type is "application/json"',
        });
      },
    });
  }
}
