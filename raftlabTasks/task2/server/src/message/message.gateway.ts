import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { ClientMessageDto } from './message.dto';
import { MessageService } from './message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  private connectedUsers: Record<string, Socket> = {};

  SECRET_KEY: string = process.env.SECRET_KEY;

  async handleConnection(client: Socket) {
    const token: string = await client.handshake.auth.token;
    if (token) {
      try {
        const decodedToken = jwt.verify(token, this.SECRET_KEY) as {
          userId: string;
        };
        this.connectedUsers[decodedToken.userId] = client;
      } catch (error) {
        console.log('[TOKEN_DECODE_ERROR]', error.message);
        client.disconnect(true);
      }
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Object.keys(this.connectedUsers).find(
      (key) => this.connectedUsers[key] === client,
    );

    if (userId) {
      delete this.connectedUsers[userId];
    }
  }

  @SubscribeMessage('joinClient')
  async handlePrivateClientMessage(
    @MessageBody()
    data: {
      senderId: string;
      recipientId: string;
    },
  ) {
    const messages = await this.messageService.findClientMessages(
      data.senderId,
      data.recipientId,
    );
    return messages;
  }

  @SubscribeMessage('clients')
  async handlePrivateMessage(
    @MessageBody()
    data: ClientMessageDto,
  ) {
    const { recipientId } = data;
    const recipientSocket = this.connectedUsers[recipientId];
    await this.messageService.create(data);
    if (recipientSocket) {
      recipientSocket.emit('clients', {
        data,
        online: Object.keys(this.connectedUsers),
      });
    }
    return { data, online: Object.keys(this.connectedUsers) };
  }
}
