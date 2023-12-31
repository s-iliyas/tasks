import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';

// root module which will bundle other modules which act as parent graph
@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
