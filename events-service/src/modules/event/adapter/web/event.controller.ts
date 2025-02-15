import { EventService } from '@modules/event/domain/service/event.service';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventRequest } from './create-event-request';
import { Response } from 'express';
import { EventDto } from '@modules/event/domain/model/event.dto';
import { EventResponseDto } from './event-response.dto';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(@Inject() private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Registers a new event' })
  @ApiCreatedResponse({ type: EventResponseDto })
  async create(@Body() request: CreateEventRequest, @Res() response: Response) {
    await this.eventService
      .save({ ...request })
      .then((result) => this.mapToDto(result))
      .then((event) => response.status(HttpStatus.CREATED).send(event));
  }

  private mapToDto(event: EventDto): EventResponseDto {
    return { ...event } as EventResponseDto;
  }
}
