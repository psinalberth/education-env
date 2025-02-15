import { ApiProperty } from '@nestjs/swagger';

export class RegistrationResponseDto {
  @ApiProperty({ example: 12 })
  registrationId: number;

  @ApiProperty({ example: '2024 Finals' })
  examId: string;

  @ApiProperty({ example: '2024-12-29T15:30:00.000Z' })
  createdAt: Date;
}
