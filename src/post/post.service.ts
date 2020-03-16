import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';
import { PostDTO } from './post.dto';
import { AtLeastOne } from 'src/types/helpers';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async showAll() {
    return await this.postRepository.find();
  }

  async create(data: PostDTO) {
    const post = this.postRepository.create(data);
    await this.postRepository.save(post);

    return post;
  }

  async read(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async update(id: string, data: AtLeastOne<PostDTO>) {
    let post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.update({ id }, data);
    post = await this.postRepository.findOne({ where: { id } });

    return post;
  }

  async destroy(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.postRepository.delete({ id });

    return post;
  }
}
