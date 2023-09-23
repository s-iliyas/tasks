import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('clients')
  handleClientMessage(@MessageBody() data: { message: string }): string {
    return data?.message;
  }

  @SubscribeMessage('rooms')
  handleRoomMessage(@MessageBody() data: { message: string }): string {
    return data?.message;
  }
}
