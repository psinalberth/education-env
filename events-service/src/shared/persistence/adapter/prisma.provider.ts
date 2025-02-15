import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaProvider.name, {
    timestamp: true,
  });

  async onModuleInit() {
    await this.$connect();
    this.logger.log('m=onModuleInit, r=Init Prisma service');
  }
}
