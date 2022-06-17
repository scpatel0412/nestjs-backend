import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostCommentDto } from './dto/create-post-comment.input';
import { UpdatePostCommentDto } from './dto/update-post-comment.input';
import { PostCommentEntity } from './entities/post-comment.entity';

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(PostCommentEntity)
    private postCommentRepository: Repository<PostCommentEntity>,
  ) {}

  async createComment(
    createCommentInput: CreatePostCommentDto,
  ): Promise<PostCommentEntity> {
    const commentInput = new PostCommentEntity();
    commentInput.userId = createCommentInput.userId;
    commentInput.postsId = createCommentInput.postsId;
    commentInput.userName = createCommentInput.userName;
    commentInput.comment = createCommentInput.comment;

    const comment = await this.postCommentRepository.save(commentInput);
    return comment;
  }

  async getComments(): Promise<Array<PostCommentEntity>> {
    const comments = await this.postCommentRepository.find({
      relations: ['posts'],
    });
    return comments;
  }

  async getComment(id: string): Promise<PostCommentEntity> {
    const comment = await this.postCommentRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    return comment;
  }

  async updateComment(
    id: string,
    updateCommentInput: UpdatePostCommentDto,
  ): Promise<PostCommentEntity> {
    const commentInput = await this.postCommentRepository.preload({
      id: id,
      ...updateCommentInput,
    });
    if (!commentInput) {
      throw new NotFoundException(`comment with ${id} not found`);
    } else {
      commentInput.userId = updateCommentInput.userId;
      commentInput.userName = updateCommentInput.userName;
      commentInput.comment = updateCommentInput.comment;

      const comment = await this.postCommentRepository.save(commentInput);
      return comment;
    }
  }

  async deleteComment(id: string): Promise<PostCommentEntity> {
    const comment = await this.postCommentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`comment with ${id} not found`);
    } else {
      await this.postCommentRepository.remove(comment);

      return {
        id: id,
        userId: '',
        userName: '',
        comment: '',
        postsId: '',
        createdAt: new Date(0),
        updatedAt: new Date(0),
        posts: null,
      };
    }
  }
}
