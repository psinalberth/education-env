import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateExamDto } from '../model/create-exam.dto';
import { ExamRepository } from '../repository/exam.repository';
import { ResourceLock } from '@shared/lock/adapter/lock.decorator';
import { ExamClient } from './exam.client';

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);
  constructor(
    @Inject(ExamRepository) private readonly examRepository: ExamRepository,
    @Inject(ExamClient) private readonly examClient: ExamClient,
  ) {}

  @ResourceLock('exams-resource', 60000)
  async save(request: CreateExamDto) {
    const existingExam = await this.examRepository.findByExternalId(
      request.examId,
    );

    if (existingExam) {
      this.logger.log(
        `Exam with id=${request.examId} already exists. Skipping it...`,
      );
      return existingExam;
    }

    this.logger.log(`Saving exam ${JSON.stringify(request)}`);
    return await this.examRepository.save(request);
  }

  async findByExternalId(externalId: string) {
    return this.examClient.findById(externalId);
  }
}
