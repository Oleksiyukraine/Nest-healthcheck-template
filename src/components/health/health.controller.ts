import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { 
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  MemoryHealthIndicator,
  HttpHealthIndicator
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongoose: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('/ping')
  @HealthCheck()
  checkPing() {
    return this.health.check([
      () => this.http.pingCheck('Test-API', 'http://localhost:3000/api'),
    ]);
  }

  @Get('/mongodb')
  @HealthCheck()
  checkMongoose() {
    return this.health.check([
      async () => this.mongoose.pingCheck('mongoose')
    ]);
  }

  @Get('/memmory')
  @HealthCheck()
  checkMemmory() {
    return this.health.check([
        async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
        async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }
}