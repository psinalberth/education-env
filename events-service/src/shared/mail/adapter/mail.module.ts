import { Global, Module } from '@nestjs/common';
import { MailService } from '../domain/mail.service';
import { SendGridMailService } from './sendgrid.mail.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: MailService,
      useClass: SendGridMailService,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
