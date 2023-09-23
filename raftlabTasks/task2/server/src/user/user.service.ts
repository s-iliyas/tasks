import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

import { RegisterUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    return this.userModel.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async findUser(email?: string): Promise<User[]> {
    const query = email ? { email } : {};
    return this.userModel.find(query);
  }
}
