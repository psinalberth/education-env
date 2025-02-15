import { Injectable } from '@nestjs/common';
import { Exam } from '@prisma/client';
import { CreateExamDto } from '@exam/domain/model/create-exam.dto';
import { ExamDto } from '@exam/domain/model/exam.dto';
import { ExamRepository } from '@modules/exam/domain/repository/exam.repository';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';

@Injectable()
export class ExamPrismaRepository implements ExamRepository {
  constructor(private prisma: PrismaProvider) {}

  async save(request: CreateExamDto): Promise<ExamDto> {
    const exam = await this.prisma.exam.create({
      data: {
        externalId: request.examId,
        title: request.title,
        createdAt: request.createdAt,
      },
    });

    return this.mapToDto(exam);
  }

  async findByExternalId(externalId: string): Promise<ExamDto | null> {
    const exam = await this.prisma.exam.findFirst({
      where: {
        externalId: externalId,
      },
    });

    return exam ? this.mapToDto(exam) : null;
  }

  private mapToDto(exam: Exam): ExamDto {
    return {
      examId: exam.id,
      externalId: exam.externalId,
      title: exam.title,
      createdAt: exam.createdAt,
    };
  }
}
