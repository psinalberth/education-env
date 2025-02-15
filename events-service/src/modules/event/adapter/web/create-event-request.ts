import { ApiProperty } from '@nestjs/swagger';

export class CreateEventRequest {
  @ApiProperty({ example: 'Winter Exams 2025' })
  title: string;

  @ApiProperty({ example: '141' })
  examId: number;

  @ApiProperty({ example: '2025-03-17T09:00:00.000' })
  date: Date;

  @ApiProperty({ example: '5000' })
  expectedRegistrations: number;

  @ApiProperty({ example: '2025-02-11T12:53:12.124' })
  createdAt: Date;
}
