import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password2: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

export class UserDto {
  email: string;
  name: string;
  password: string;
  id: string;
}
