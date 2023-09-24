import { CreateRoomDto } from './room.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from '../schemas/room.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create(createRoomDto);
  }

  async findRooms(id?: string): Promise<Room[]> {
    const query = id ? { id } : {};
    return this.roomModel.find(query);
  }
}
