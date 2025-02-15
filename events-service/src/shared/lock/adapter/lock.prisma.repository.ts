import { Injectable, Logger, MethodNotAllowedException } from '@nestjs/common';
import { addMinutes, format } from 'date-fns';
import { UTCDate } from '@date-fns/utc';
import { LockRepository } from '@shared/lock/domain/lock.repository';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';

@Injectable()
export class LockPrismaRepository implements LockRepository {
  private logger = new Logger(LockPrismaRepository.name, {
    timestamp: true,
  });

  constructor(private prisma: PrismaProvider) {}

  async acquireLock(resource: string, timeToLiveInMs: number) {
    const expiringDate = new Date(Date.now());
    const timeToLiveInSeconds = timeToLiveInMs / 1000;
    expiringDate.setSeconds(expiringDate.getSeconds() + timeToLiveInSeconds);

    this.logger.log(
      `Trying to acquire lock for '${resource}' resource with expiring date at '${this.formatDate(expiringDate)}'`,
    );

    try {
      const lock = await this.prisma.resourceLock.create({
        data: {
          resource: resource,
          expiringDate: expiringDate,
        },
        select: {
          id: true,
        },
      });

      return lock.id;
    } catch (error) {
      this.logger.error(error);
      throw new MethodNotAllowedException('Resource is locked');
    }
  }

  async releaseLock(resource: string) {
    this.logger.log(`Releasing lock for resource '${resource}'`);
    await this.prisma.resourceLock.delete({ where: { resource: resource } });
  }

  async releaseExpiredLocks(resource: string) {
    const date = addMinutes(new UTCDate(), 1);
    this.logger.log(
      `Releasing expired locks for '${resource}' resource before '${this.formatDate(date)}'`,
    );
    await this.prisma.resourceLock.deleteMany({
      where: {
        resource: resource,
        expiringDate: {
          lt: date,
        },
      },
    });
  }

  private formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }
}
