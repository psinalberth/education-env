import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ChannelWrapper, connect } from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQProvider implements OnModuleInit {
  private channel: ChannelWrapper;
  private readonly logger = new Logger(RabbitMQProvider.name, {
    timestamp: true,
  });

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.channel = await this.start();
    this.logger.log('m=onModuleInit, r=Init RabbitMQ service');
  }

  private async start() {
    const uri = this.configService.get<string>('RABBITMQ_URI');
    const conn = connect(uri);
    const channel = conn.createChannel();
    return channel;
  }

  async consume(queue: string, callback?: (message: any) => void) {
    if (!this.channel) this.channel = await this.start();
    this.channel.consume(queue, (message) => {
      if (callback) callback(message);
      this.channel.ack(message);
    });
  }

  async publish(queue: string) {
    if (!this.channel) this.channel = await this.start();
    this.channel.sendToQueue(queue, '');
  }
}
