import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { MailService } from '../domain/mail.service';
import { MailOptions } from '../domain/mail-options';

@Injectable()
export class SendGridMailService implements MailService {
  private sender: string;
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('EMAIL_API_KEY'));
    this.sender = this.configService.get<string>('EMAIL_SENDER');
  }
  async send(options: MailOptions): Promise<void> {
    await SendGrid.send({
      subject: options.subject,
      from: options.from ?? this.sender,
      to: options.to,
      text: options.body,
    });
  }
}
