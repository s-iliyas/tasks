import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class RoomMessageDto {
  @IsString()
  message: string;

  @IsString()
  room: string;

  @IsString()
  messageId: string;

  @IsString()
  senderId: string;
}
