import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { connect } from 'amqp-connection-manager';

@Injectable()
export class RabbitMQHealthIndicator extends HealthIndicator {
  private readonly logger = new Logger(RabbitMQHealthIndicator.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const uri = this.configService.get<string>('RABBITMQ_URI');
    const connection = connect(uri);
    const key = 'rabbitmq';

    try {
      await connection.connect({ timeout: 5000 });
      return this.getStatus(key, connection.isConnected());
    } catch (error) {
      this.logger.error(`RabbitMQ health has failed due to ${error}`);
      throw new HealthCheckError(
        'RabbitMQ health check failed',
        this.getStatus(key, false),
      );
    }
  }
}
