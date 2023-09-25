import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ContactFormDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  phoneNumber: string;
}

export class ContactDataFormDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  linkedId: any;

  linkPrecedence: string;
}
