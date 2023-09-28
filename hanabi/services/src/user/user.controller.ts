import * as moment from 'moment';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // function to create user form if new
  @HttpCode(200)
  @Post('create')
  async create(@Body() userDto: UserDto) {
    // validating date of birth format
    const checkFormat = ['DD-MM-YYYY', 'D-M-YYYY'].some((format) =>
      moment(userDto?.dob, format, true).isValid(),
    );
    if (!checkFormat) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid Date of Birth Date format',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      // sending request body after validation in to create service
      return await this.userService.create(userDto);
    } catch (error) {
      console.log('[CREATE_USER_ERROR]', error.message);
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // function to update user form if previously submitted
  @HttpCode(200)
  @Post('update')
  async update(@Body() userDto: UserDto) {
    // validating date of birth format
    const checkFormat = ['DD-MM-YYYY', 'D-M-YYYY'].some((format) =>
      moment(userDto?.dob, format, true).isValid(),
    );
    if (!checkFormat) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid Date of Birth Date format',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      // sending request body after validation in to update service
      return await this.userService.update(userDto);
    } catch (error) {
      console.log('[UPDATE_USER_ERROR]', error.message);
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // function to get user form
  @HttpCode(200)
  @Get(':username')
  async findOne(
    @Param('username') username: string,
  ): Promise<User | { username: string }> {
    try {
      // if user form exists sending it in response or username
      return (await this.userService.findOne(username)) || { username };
    } catch (error) {
      console.log('[GET_USER_ERROR]', error.message);
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: error.meta.target },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
