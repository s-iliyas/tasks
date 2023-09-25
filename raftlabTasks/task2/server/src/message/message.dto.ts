import { IsString } from 'class-validator';

export class ClientMessageDto {
  @IsString()
  recipientId: string;

  @IsString()
  message: string;

  @IsString()
  senderId: string;
}
