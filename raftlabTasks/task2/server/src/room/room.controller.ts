import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './room.dto';

@Controller('rooms')
export class RoomController {
  SECRET_KEY: string = process.env.SECRET_KEY;
  constructor(private readonly roomService: RoomService) {}

  @Post('create')
  async create(@Body() data: CreateRoomDto) {
    try {
      await this.roomService.create(data);
      return { message: 'Room Created' };
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getRooms() {
    try {
      const rooms = await this.roomService.findRooms();
      return rooms.map((room) => ({
        name: room.name,
        description: room.description,
      }));
    } catch (error) {
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
