import { IsNotEmpty, IsString } from 'class-validator';

export class PostBodyInputDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
