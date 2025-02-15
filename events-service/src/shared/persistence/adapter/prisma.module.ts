import { Global, Module } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaProvider],
  exports: [],
})
export class PrismaModule {}
