import { ApiProperty } from '@nestjs/swagger';

export class CreateRegistrationRequest {
  @ApiProperty({ example: '412' })
  eventId: number;
}
