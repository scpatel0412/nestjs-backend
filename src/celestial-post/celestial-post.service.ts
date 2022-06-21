import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCelestialPostDto } from './dto/create-celestial-post.input';
import { UpdateCelestialPostInput } from './dto/update-celestial-post.input';
import { CelestialPost } from './entities/celestial-post.entity';
import { CelestialPostModel } from './model/celestial-post.model';

@Injectable()
export class CelestialPostService {
  constructor(
    @InjectRepository(CelestialPost)
    private celestialPostRepository: Repository<CelestialPost>,
  ) {}

  async getPosts(): Promise<Array<CelestialPost>> {
    const post = await this.celestialPostRepository.find({
      relations: ['users', 'comments', 'likes'],
    });
    return post;
  }

  async createPost(
    celestialPostData: CreateCelestialPostDto,
  ): Promise<CelestialPost> {
    const dateandtime = Date.now();
    const post = new CelestialPost();
    post.userId = celestialPostData.userId;
    post.slug = `${celestialPostData.slug}_${dateandtime}`;
    post.description = celestialPostData.description;
    post.imageLink = celestialPostData.imageLink;

    const createdPost = await this.celestialPostRepository.save(post);
    return createdPost;
  }

  async getPost(id: any): Promise<CelestialPost> {
    const post = await this.celestialPostRepository.findOne({
      where: { id },
      relations: ['users', 'comments', 'likes'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ${id} with cannot be found`);
    }
    return post;
  }

  async deletePost(id: any): Promise<CelestialPost> {
    const post = await this.celestialPostRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ${id} not found`);
    } else {
      await this.celestialPostRepository.remove(post);
      return {
        id: id,
        userId: '',
        imageLink: '',
        description: '',
        slug: '',
        createdAt: new Date(0),
        updatedAt: new Date(0),
        users: undefined,
        comments: null,
        likes: null,
      };
    }
  }

  async updatePost(
    id: any,
    updateCelestialPost: CreateCelestialPostDto,
  ): Promise<CreateCelestialPostDto> {
    const post = await this.celestialPostRepository.preload({
      id: id,
      ...updateCelestialPost,
    });
    post.userId = updateCelestialPost.userId;
    post.slug = updateCelestialPost.slug;
    post.description = updateCelestialPost.description;
    post.imageLink = updateCelestialPost.imageLink;

    if (!post) {
      throw new NotFoundException(`post with ${id} not found`);
    } else {
      const updatedPost = await this.celestialPostRepository.save(post);
      return updatedPost;
    }
  }
}
