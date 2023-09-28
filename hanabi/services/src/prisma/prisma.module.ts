import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// primsa module to encapsulate and bundle components like present prisma service
@Module({
  // exporting prisma service so can be used in other modules or services
  exports: [PrismaService],
  providers: [PrismaService],
})
export class PrismaModule {}
