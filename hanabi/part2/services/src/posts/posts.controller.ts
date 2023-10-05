import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PostBodyInputDto } from './dto/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Post()
  async addPost(@Body() body: PostBodyInputDto) {
    try {
      const post = await this.postService.addPost(body);
      return post;
    } catch (error) {
      console.log('[ADD_POST_ERROR]', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getPost() {
    try {
      const posts = await this.postService.getPosts();
      return posts;
    } catch (error) {
      console.log('[GET_POST_ERROR]', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
