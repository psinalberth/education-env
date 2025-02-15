import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RegistrationModule } from '@modules/registration/adapter/config/registration.module';
import { ExamModule } from '@modules/exam/adapter/config/exam.module';
import { LockModule } from '@shared/lock/adapter/lock.module';
import { MailModule } from '@shared/mail/adapter/mail.module';
import { PrismaModule } from '@shared/persistence/adapter/prisma.module';
import { HealthModule } from '@modules/health/adapter/config/health.module';
import { EventModule } from '@modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LockModule.forRoot(),
    MailModule,
    HealthModule,
    PrismaModule,
    RegistrationModule,
    ExamModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
