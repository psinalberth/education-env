import { DynamicModule, Global, Module } from '@nestjs/common';
import { LockPrismaRepository } from './lock.prisma.repository';
import { LockService } from '@shared/lock/domain/lock.service';
import { LockRepository } from '@shared/lock/domain/lock.repository';
import { PrismaProvider } from '@shared/persistence/adapter/prisma.provider';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaProvider,
    {
      provide: LockRepository,
      useClass: LockPrismaRepository,
    },
  ],
})
export class LockModule {
  static forRoot(): DynamicModule {
    return {
      module: LockModule,
      providers: [
        {
          provide: LockService,
          useFactory: (lockRepository: LockRepository) => {
            return new LockService(lockRepository);
          },
          inject: [LockRepository],
        },
      ],
      exports: [LockService],
    };
  }
}
