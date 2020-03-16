import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDTO } from './post.dto';
import { AtLeastOne } from 'src/types/helpers';

@Controller('post')
export class PostController {
  private logger = new Logger('PostController');
  constructor(private postService: PostService) {}

  @Get()
  showAllPosts() {
    return this.postService.showAll();
  }

  @Post()
  createPost(@Body() data: PostDTO) {
    this.logger.log(JSON.stringify(data));

    return this.postService.create(data);
  }

  @Get(':id')
  readPost(@Param('id') id: string) {
    return this.postService.read(id);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() data: AtLeastOne<PostDTO>) {
    this.logger.log(JSON.stringify(data));

    return this.postService.update(id, data);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.destroy(id);
  }
}
