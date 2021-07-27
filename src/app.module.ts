import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AcceptMiddleware } from './accept.middleware';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [RepositoriesModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AcceptMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
