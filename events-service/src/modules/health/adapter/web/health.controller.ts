import { RabbitMQHealthIndicator } from '@modules/health/adapter/indicator/rabbitmq.health';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaProvider,
    private db: PrismaHealthIndicator,
    private rabbitMQ: RabbitMQHealthIndicator,
  ) {}

  @Get()
  @HealthCheck({ swaggerDocumentation: false })
  check() {
    return this.health.check([
      () => Promise.resolve({ server: { status: 'up' } }),
      () => this.db.pingCheck('database', this.prisma),
      () => this.rabbitMQ.isHealthy(),
    ]);
  }
}
