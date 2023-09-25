import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  message: string;

  @Prop()
  senderId: string;

  @Prop()
  recipientId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
