import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room.service';
import { RoomMessageDto } from './room.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {}

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
      const roomMessages = await this.roomService.getRoom(room);
      const data = roomMessages[0]?.messages.slice(0, 50);
      return data;
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() data: RoomMessageDto) {
    const { room } = data;
    await this.roomService.addRoomMsg(data);
    this.server.to(room).emit('messageReceived', data);
    return data;
  }
}
