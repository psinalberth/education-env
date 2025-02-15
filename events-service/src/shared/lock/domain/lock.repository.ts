export interface LockRepository {
  acquireLock(resource: string, timeToLiveInMs: number): Promise<number>;

  releaseLock(resource: string): Promise<void>;

  releaseExpiredLocks(resource: string): Promise<void>;
}

export const LockRepository = Symbol('LockRepository');
