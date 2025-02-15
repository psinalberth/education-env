import { ApiProperty } from '@nestjs/swagger';

export class CreateRegistrationRequest {
  @ApiProperty({ example: 'f56b639d-2e3a-4f40-8a2b-909292744a01' })
  examId: string;
}
