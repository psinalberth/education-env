import { Injectable, Logger } from '@nestjs/common';
import { ExamPublishedDto } from '@exam/domain/model/exam-published.dto';
import { ExamConsumer } from '@exam/domain/service/exam.consumer';
import { ExamService } from '@exam/domain/service/exam.service';
import { RabbitMQProvider } from '@shared/message/adapter/rabbitmq.provider';

@Injectable()
export class ExamRabbitMQConsumer implements ExamConsumer {
  private readonly logger = new Logger(ExamRabbitMQConsumer.name, {
    timestamp: true,
  });

  constructor(
    private rabbitProvider: RabbitMQProvider,
    private readonly examService: ExamService,
  ) {}

  async consume() {
    this.onModuleInit();
  }

  async onModuleInit() {
    await this.rabbitProvider.consume('exams-published', (message) => {
      const exam = JSON.parse(message.content.toString()) as ExamPublishedDto;
      this.logger.log(`m=consume, r=Received exam =${JSON.stringify(exam)}`);

      this.examService.findByExternalId(exam.examId).then((r) => {
        this.logger.log(r.data);
      });

      if (exam) {
        this.examService.save({ ...exam });
      }
    });
  }
}
