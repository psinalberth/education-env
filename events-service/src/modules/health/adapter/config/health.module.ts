import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '@shared/persistence/adapter/prisma.module';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';
import { RabbitMQHealthIndicator } from '../indicator/rabbitmq.health';
import { HealthController } from '../web/health.controller';

@Module({
  imports: [TerminusModule, HttpModule, PrismaModule],
  providers: [PrismaProvider, RabbitMQHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
