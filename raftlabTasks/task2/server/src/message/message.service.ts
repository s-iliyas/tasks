import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { ClientMessageDto } from './message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(data: ClientMessageDto): Promise<Message> {
    return this.messageModel.create(data);
  }

  async findClientMessages(
    senderId?: string,
    recipientId?: string,
  ): Promise<Message[]> {
    const query = {
      $or: [
        { senderId, recipientId },
        { recipientId: senderId, senderId: recipientId },
      ],
    };
    return this.messageModel.find(query).limit(50);
  }
}
