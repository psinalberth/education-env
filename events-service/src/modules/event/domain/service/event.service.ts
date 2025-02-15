import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { CreateEventDto } from '../model/create-event.dto';
import { ResourceLock } from '@shared/lock/adapter/lock.decorator';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  constructor(
    @Inject(EventRepository) private readonly eventRepository: EventRepository,
  ) {}

  @ResourceLock('events-resource', 60000)
  async save(request: CreateEventDto) {
    return await this.eventRepository.save(request);
  }

  async findById(eventId: number) {
    return await this.eventRepository.findById(eventId);
  }
}
