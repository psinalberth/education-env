import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ExamDto } from '../model/exam.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExamClient {
  constructor(private readonly httpService: HttpService) {}

  async findById(examId: string) {
    return await firstValueFrom(
      this.httpService.get<ExamDto>(`/v1/exams/${examId}`),
    );
  }
}
