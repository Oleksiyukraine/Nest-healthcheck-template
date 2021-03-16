import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from '../health/health.module';
import { ConfigModule } from '@nestjs/config';

const logger: Logger = new Logger('APP module');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true }),
    RedisModule.register({
      url: process.env.REDIS_URI,
      onClientReady: async (client: any): Promise<void> => {
        client.on('error', logger.error);
        client.on('ready', () => logger.verbose('Redis is running on 6379 port'));
        client.on('restart', () => logger.warn('attempt to restart the redis server'));
      },
      reconnectOnError: (): boolean => true,
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
