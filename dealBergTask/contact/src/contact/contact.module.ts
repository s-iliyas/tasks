import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ContactService],
  imports: [PrismaModule],
})
export class ContactModule {}
