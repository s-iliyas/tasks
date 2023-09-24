import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  SECRET_KEY: string = process.env.SECRET_KEY;
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    if (data.password !== data.password2) {
      throw new HttpException(
        { error: 'Passwords do not match' },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const oldUser = await this.userService.findUser(data.email);
      if (oldUser.length > 0) {
        throw new Error('User already exists. Please Login.');
      }
      const user = await this.userService.register(data);
      const token = jwt.sign({ email: user.email }, this.SECRET_KEY, {
        expiresIn: '1d',
      });
      return { message: 'Registration Success.', token, email: user.email };
    } catch (error) {
      console.log('[REGISTER_USER_ERROR]', error.message);
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    try {
      const user = await this.userService.findUser(data.email);
      if (user.length === 0) {
        throw new Error('User does not exists. Please Register.');
      }
      const comparePassword = bcrypt.compare(data.password, user[0].password);
      if (!comparePassword) {
        throw new Error('Incorrect Password.');
      }
      const token = jwt.sign({ email: user[0].email }, this.SECRET_KEY, {
        expiresIn: '1d',
      });
      return { message: 'Login success.', token, email: user[0].email };
    } catch (error) {
      console.log('[REGISTER_USER_ERROR]', error.message);
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async users() {
    try {
      const users = await this.userService.findUser();
      return { users: users.map((user) => user.email) };
    } catch (error) {
      console.log('[GET_USERS_ERROR]', error.message);
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
