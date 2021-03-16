import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        TerminusModule,
        MongooseModule.forRoot('mongodb+srv://test:PjXjuvi6pSRud5k@cluster0.qqsty.mongodb.net/test?retryWrites=true&w=majority'),
    ],
    controllers: [HealthController],
})
export class HealthModule {}
