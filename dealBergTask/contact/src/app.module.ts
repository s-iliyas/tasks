import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContactService } from './contact/contact.service';

@Module({
  imports: [ContactModule, PrismaModule],
  controllers: [ContactController],
  providers: [PrismaService, ContactService],
})
export class AppModule {}
