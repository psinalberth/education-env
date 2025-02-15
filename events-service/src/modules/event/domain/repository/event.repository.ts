import { CreateEventDto } from '../model/create-event.dto';
import { EventDto } from '../model/event.dto';

export interface EventRepository {
  save(request: CreateEventDto): Promise<EventDto>;

  findById(eventId: number): Promise<EventDto | null>;
}

export const EventRepository = Symbol('EventRepository');
