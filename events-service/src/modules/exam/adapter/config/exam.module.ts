import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@shared/message/adapter/rabbitmq.module';
import { RabbitMQProvider } from '@shared/message/adapter/rabbitmq.provider';
import { ExamRabbitMQConsumer } from '../message/exam.rabbitmq.consumer';
import { ExamService } from '@exam/domain/service/exam.service';
import { ExamRepository } from '@modules/exam/domain/repository/exam.repository';
import { ExamPrismaRepository } from '../persistence/exam.prisma.repository';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';
import { HttpModule } from '@nestjs/axios';
import { ExamClient } from '@modules/exam/domain/service/exam.client';

@Module({
  imports: [
    RabbitMQModule,
    HttpModule.register({
      baseURL: process.env.API_EXAMS_SERVICE_URL,
    }),
  ],
  providers: [
    RabbitMQProvider,
    ExamRabbitMQConsumer,
    PrismaProvider,
    ExamService,
    ExamClient,
    {
      provide: ExamRepository,
      useClass: ExamPrismaRepository,
    },
  ],
  exports: [ExamService],
})
export class ExamModule {}
