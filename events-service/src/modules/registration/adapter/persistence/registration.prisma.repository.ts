import { Injectable, Logger } from '@nestjs/common';
import { Registration } from '.prisma/client';
import { RegistrationDto } from '@modules/registration/domain/model/registration.dto';
import { CreateRegistrationDto } from '@modules/registration/domain/model/create-registration.dto';
import { RegistrationRepository } from '@modules/registration/domain/repository/registration.repository';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';

@Injectable()
export class RegistrationPrismaRepository implements RegistrationRepository {
  private readonly logger = new Logger(RegistrationPrismaRepository.name, {
    timestamp: true,
  });

  constructor(private prisma: PrismaProvider) {}

  async findByUserIdAndEventId(
    userId: number,
    eventId: number,
  ): Promise<RegistrationDto | null> {
    this.logger.log(
      `m=findByUserIdAndExamId, o=userId ${userId}, o=examId ${eventId}`,
    );
    const registration = await this.prisma.registration.findFirst({
      where: {
        eventId: eventId,
        userId: userId,
      },
    });
    return registration ? this.mapDto(registration) : null;
  }

  async findAll(userId: number): Promise<RegistrationDto[]> {
    this.logger.log(`m=findAll, o=Fetching registrations for user ${userId}`);
    const registrations = await this.prisma.registration.findMany({
      where: {
        userId: userId,
      },
    });
    return registrations.map((registration) => this.mapDto(registration));
  }

  async save(request: CreateRegistrationDto): Promise<RegistrationDto> {
    this.logger.log(`m=save, o=${JSON.stringify(request)}`);
    const registration = await this.prisma.registration
      .create({
        data: {
          eventId: request.eventId,
          userId: Number.parseInt(request.userId),
        },
      })
      .then((s) => {
        this.logger.log(`m=save, o=${JSON.stringify(s)}, r=saved successfully`);
        return s;
      });
    return this.mapDto(registration);
  }

  private mapDto(registration: Registration): RegistrationDto {
    return {
      registrationId: registration.id,
      eventId: registration.eventId,
      createdAt: registration.createdAt,
    } as RegistrationDto;
  }
}
