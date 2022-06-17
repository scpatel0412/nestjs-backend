import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostLikeDto } from './dto/create-post-like.input';
import { UpdatePostLikeDto } from './dto/update-post-like.input';
import { PostLikeEntity } from './entities/post-like.entity';

@Injectable()
export class PostLikesService {
  constructor(
    @InjectRepository(PostLikeEntity)
    private postLikeRepository: Repository<PostLikeEntity>,
  ) {}

  async createLike(
    createPostLikeInput: CreatePostLikeDto,
  ): Promise<PostLikeEntity> {
    const likeInput = new PostLikeEntity();
    likeInput.userId = createPostLikeInput.userId;
    likeInput.userName = createPostLikeInput.userName;
    likeInput.like = createPostLikeInput.like;

    const like = await this.postLikeRepository.save(likeInput);
    return like;
  }

  async updateLike(
    id: string,
    updatePostLikeInput: UpdatePostLikeDto,
  ): Promise<PostLikeEntity> {
    const likeInput = await this.postLikeRepository.preload({
      id: id,
      ...updatePostLikeInput,
    });
    if (!likeInput) {
      throw new NotFoundException(`like with ${id} not found`);
    } else {
      likeInput.userId = updatePostLikeInput.userId;
      likeInput.userName = updatePostLikeInput.userName;
      likeInput.like = updatePostLikeInput.like;

      const like = await this.postLikeRepository.save(likeInput);
      return like;
    }
  }

  async deleteLike(id: string): Promise<PostLikeEntity> {
    const like = await this.postLikeRepository.findOne({ where: { id } });

    if (!like) {
      throw new NotFoundException(`comment with ${id} not found`);
    } else {
      await this.postLikeRepository.remove(like);

      return {
        id: id,
        userId: '',
        userName: '',
        like: false,
        createdAt: new Date(0),
        updatedAt: new Date(0),
        posts: null,
      };
    }
  }
  async getComments(): Promise<Array<PostLikeEntity>> {
    const like = await this.postLikeRepository.find({
      relations: ['posts'],
    });
    return like;
  }

  async getComment(id: string): Promise<PostLikeEntity> {
    const like = await this.postLikeRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    return like;
  }
}
