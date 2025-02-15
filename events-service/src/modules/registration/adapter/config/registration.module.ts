import { Module } from '@nestjs/common';
import { RegistrationService } from '../../domain/service/registration.service';
import { RegistrationPrismaRepository } from '../persistence/registration.prisma.repository';
import { RegistrationRepository } from '@modules/registration/domain/repository/registration.repository';
import { RegistrationController } from '../web/registration.controller';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';

@Module({
  imports: [],
  providers: [
    PrismaProvider,
    RegistrationService,
    {
      provide: RegistrationRepository,
      useClass: RegistrationPrismaRepository,
    },
  ],
  controllers: [RegistrationController],
  exports: [RegistrationService],
})
export class RegistrationModule {}
