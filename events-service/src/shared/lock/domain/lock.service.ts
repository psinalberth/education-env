import { LockRepository } from './lock.repository';

export class LockService {
  constructor(private readonly lockRepository: LockRepository) {}

  async acquireLock(resource: string, timeToLiveInMs: number) {
    await this.releaseExpiredLocks(resource);

    return await this.lockRepository.acquireLock(resource, timeToLiveInMs);
  }

  async releaseLock(resource: string) {
    return await this.lockRepository.releaseLock(resource);
  }

  private async releaseExpiredLocks(resource: string) {
    return this.lockRepository.releaseExpiredLocks(resource);
  }
}
