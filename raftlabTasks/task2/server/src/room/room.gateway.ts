import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Message {
  recipientId: string;
  message: string;
  senderId: string;
  room: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const room = client.handshake.auth.room;
    client.join(room);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { room } = data;
    if (room) {
      client.join(room);
      client.emit('roomJoined', { room });
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: Message) {
    const { room } = data;
    this.server.to(room).emit('messageReceived', data);
    return data;
  }
}
