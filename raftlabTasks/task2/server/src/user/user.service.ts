import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

import { RegisterUserDto, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userModel
      .create({
        ...registerUserDto,
        password: hashedPassword,
      })
      .then((doc) => ({
        id: String(doc._id),
        email: doc.email,
        name: doc.name,
        password: doc.password,
      }));
    return user;
  }

  async findUser(email?: string): Promise<UserDto[]> {
    const query = email ? { email } : {};
    return this.userModel.find(query);
  }
}
