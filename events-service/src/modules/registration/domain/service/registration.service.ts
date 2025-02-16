import { Inject, Logger } from '@nestjs/common';
import { CreateRegistrationDto } from '../model/create-registration.dto';
import { RegistrationDto } from '../model/registration.dto';
import { ResourceLock } from '@shared/lock/adapter/lock.decorator';
import { RegistrationRepository } from '../repository/registration.repository';
import { MailService } from '@shared/mail/domain/mail.service';
import retry from '@shared/retry/retry';

export class RegistrationService {
  private logger: Logger;

  constructor(
    @Inject(RegistrationRepository)
    private readonly registrationRepository: RegistrationRepository,
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {
    this.logger = new Logger(RegistrationService.name, { timestamp: true });
  }

  async findAll(userId: number): Promise<RegistrationDto[]> {
    return this.registrationRepository.findAll(userId);
  }

  @ResourceLock('registrations-resource', 60000)
  async registerSubscription(
    request: CreateRegistrationDto,
  ): Promise<RegistrationDto> {
    const existingRegistration =
      await this.registrationRepository.findByUserIdAndEventId(
        Number.parseInt(request.userId),
        request.eventId,
      );

    if (existingRegistration) {
      this.logger.log(
        `m=registerSubscription, o=Subscription for user=${request.userId} and examId=${request.eventId} already exists.`,
      );
      return existingRegistration;
    }

    const registration = await this.registrationRepository.save(request);

    if (registration) {
      const sendMail = this.mailService.send({
        to: request.userEmail,
        subject: 'Registration confirmed!',
        body: 'Hey, we have some great news!! Your registration was confirmed!',
      });

      await retry(() => sendMail, {
        maxAttempts: 3,
      }).then(() => Logger.log('E-mail sent successfully!'));
    }

    return registration;
  }
}
