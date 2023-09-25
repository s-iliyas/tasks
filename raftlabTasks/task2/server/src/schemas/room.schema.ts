import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  messages: { senderId: string; message: string; messageId: string }[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
