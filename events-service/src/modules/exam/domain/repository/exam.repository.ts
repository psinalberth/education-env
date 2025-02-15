import { CreateExamDto } from '../model/create-exam.dto';
import { ExamDto } from '../model/exam.dto';

export interface ExamRepository {
  save(request: CreateExamDto): Promise<ExamDto>;

  findByExternalId(externalId: string): Promise<ExamDto | null>;
}

export const ExamRepository = Symbol('ExamRepository');
