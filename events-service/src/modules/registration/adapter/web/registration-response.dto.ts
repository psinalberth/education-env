import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseDto {
  @ApiProperty({ example: 12 })
  registrationId: number;

  @ApiProperty({ example: '412' })
  eventId: number;

  @ApiProperty({ example: '2024-12-29T15:30:00.000Z' })
  createdAt: Date;
}
