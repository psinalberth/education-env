import { Module } from '@nestjs/common';
import { EventController } from './adapter/web/event.controller';
import { EventRepository } from './domain/repository/event.repository';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';
import { EventService } from './domain/service/event.service';
import { EventPrismaRepository } from './adapter/persistence/event.prisma.repository';

@Module({
  providers: [
    PrismaProvider,
    EventService,
    {
      provide: EventRepository,
      useClass: EventPrismaRepository,
    },
  ],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
