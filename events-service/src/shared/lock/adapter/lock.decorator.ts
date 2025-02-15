import { Inject, Logger } from '@nestjs/common';
import { LockService } from '@shared/lock/domain/lock.service';

export function ResourceLock(
  key: string,
  timeToLiveInMs: number,
): MethodDecorator {
  const injectLockService = Inject(LockService);
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    injectLockService(target, 'lockService');
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const service: LockService = this.lockService;

      try {
        const lock = await service.acquireLock(key, timeToLiveInMs);

        if (lock) {
          return await originalMethod.apply(this, args);
        }
      } catch (error) {
        Logger.error(
          `Lock for resource '${key}' could not be acquired due to ${error}`,
        );
      } finally {
        await service.releaseLock(key);
      }
    };
    return descriptor;
  };
}
