import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // create form query into prisma
  create(userDto: UserDto): Promise<User> {
    return this.prisma.user.create({
      data: userDto,
    });
  }

  // update form query into prisma
  update(userDto: UserDto): Promise<User> {
    return this.prisma.user.update({
      where: { username: userDto.username },
      data: userDto,
    });
  }

  // find query into prisma
  findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
