import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageGateway } from './message/message.gateway';
import { RoomModule } from './room/room.module';
import verifyToken from './middlewares/token.middleware';
import { RoomController } from './room/room.controller';
import { EventsController } from './events/events.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    UserModule,
    RoomModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService, MessageGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyToken).forRoutes(RoomController);
  }
}
