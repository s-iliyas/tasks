import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostBodyInputDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  addPost(body: PostBodyInputDto) {
    return this.prisma.post.create({ data: body });
  }

  getPosts() {
    return this.prisma.post.findMany({});
  }
}
