import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

interface Message {
  recipientId: string;
  message: string;
  senderId: string;
  // room: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Record<string, Socket> = {}; // Store connected users and their sockets
  // private connectedRooms: Record<string, Socket> = {}; // Store connected users and their sockets

  SECRET_KEY: string = process.env.SECRET_KEY;

  async handleConnection(client: Socket) {
    // Handle user authentication and join a room based on the token
    const token: string = await client.handshake.auth.token;

    if (token) {
      try {
        const decodedToken = jwt.verify(token, this.SECRET_KEY) as {
          email: string;
        }; // Verify and decode the JWT
        this.connectedUsers[decodedToken.email] = client; // Store the user's socket connection
      } catch (error) {
        console.log('[TOKEN_DECODE_ERROR]', error.message);
        // Handle authentication error
        client.disconnect(true);
      }
    }
  }

  handleDisconnect(client: Socket) {
    // Remove the user from the list of connected users on disconnect
    const userEmail = Object.keys(this.connectedUsers).find(
      (key) => this.connectedUsers[key] === client,
    );

    if (userEmail) {
      delete this.connectedUsers[userEmail];
    }
  }

  @SubscribeMessage('clients')
  handlePrivateMessage(
    @MessageBody()
    data: Message,
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

  // @SubscribeMessage('join-room')
  // handleJoinRoom(@MessageBody() data: { room: string }, client: Socket) {
  //   const { room } = data;
  //   this.connectedRooms[room] = client;
  //   return data;
  // }

  // @SubscribeMessage('rooms')
  // handleRoomMessage(@MessageBody() data: Message) {
  //   const { room } = data;
  //   const recipientSocket = this.connectedRooms[room];
  //   console.log(recipientSocket);
  //   if (recipientSocket) {
  //     recipientSocket.emit('rooms', {
  //       data,
  //       online: Object.keys(this.connectedUsers),
  //     });
  //   }
  //   return { data, online: Object.keys(this.connectedUsers) };
  // }
}
