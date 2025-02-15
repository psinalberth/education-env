import { CreateEventDto } from '@modules/event/domain/model/create-event.dto';
import { EventDto } from '@modules/event/domain/model/event.dto';
import { EventRepository } from '@modules/event/domain/repository/event.repository';
import { Injectable } from '@nestjs/common';
import { Event, EventStatus } from '.prisma/client';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';

@Injectable()
export class EventPrismaRepository implements EventRepository {
  constructor(private prisma: PrismaProvider) {}

  async save(request: CreateEventDto): Promise<EventDto> {
    const event = await this.prisma.event.create({
      data: {
        title: request.title,
        examId: request.examId,
        status: EventStatus.CREATED,
        date: request.date,
        expectedRegistrations: request.expectedRegistrations,
        createdAt: request.createdAt,
      },
    });

    return this.mapToDto(event);
  }

  async findById(eventId: number): Promise<EventDto | null> {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    return event ? this.mapToDto(event) : null;
  }

  private mapToDto(event: Event) {
    return {
      eventId: event.id,
      title: event.title,
      examId: event.examId,
      status: event.status,
      date: event.date,
      expectedRegistrations: event.expectedRegistrations,
      totalRegistrations: event.totalRegistrations,
      createdAt: event.createdAt,
    } as EventDto;
  }
}
