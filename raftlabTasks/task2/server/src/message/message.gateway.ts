import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { ClientMessageDto } from './message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Record<string, Socket> = {};

  SECRET_KEY: string = process.env.SECRET_KEY;

  async handleConnection(client: Socket) {
    const token: string = await client.handshake.auth.token;
    if (token) {
      try {
        const decodedToken = jwt.verify(token, this.SECRET_KEY) as {
          email: string;
        };
        this.connectedUsers[decodedToken.email] = client;
      } catch (error) {
        console.log('[TOKEN_DECODE_ERROR]', error.message);
        client.disconnect(true);
      }
    }
  }

  handleDisconnect(client: Socket) {
    const userEmail = Object.keys(this.connectedUsers).find(
      (key) => this.connectedUsers[key] === client,
    );

    if (userEmail) {
      delete this.connectedUsers[userEmail];
    }
  }

  @SubscribeMessage('joinClient')
  handlePrivateClientMessage(
    @MessageBody()
    data: {
      userEmail: string;
    },
  ) {
    return { message: `${data.userEmail} Joined` };
  }

  @SubscribeMessage('clients')
  handlePrivateMessage(
    @MessageBody()
    data: ClientMessageDto,
  ) {
    const { recipientId } = data;
    const recipientSocket = this.connectedUsers[recipientId];
    if (recipientSocket) {
      recipientSocket.emit('clients', {
        data,
        online: Object.keys(this.connectedUsers),
      });
    }
    return { data, online: Object.keys(this.connectedUsers) };
  }
}
