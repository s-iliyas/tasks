import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

// creating data transfer object to map the response data in this format
export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

// creating data transfer object to map the request body in this format
export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty({ message: 'Date of Birth can not be empty' })
  dob: string;
}
