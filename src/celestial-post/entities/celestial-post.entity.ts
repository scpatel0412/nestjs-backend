import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostCommentEntity } from 'src/post-comments/entities/post-comment.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('celestialPost')
@ObjectType()
export class CelestialPost {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column('varchar')
  userId: string;

  @Field(() => String)
  @Column('varchar')
  description: string;

  @Field(() => String)
  @Column('varchar')
  imageLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (users: UserEntity) => users.celestialPosts)
  @Field(() => UserEntity, { nullable: true })
  users: UserEntity;

  @OneToMany(
    () => PostCommentEntity,
    (comments: PostCommentEntity) => comments.posts,
  )
  @Field(() => [PostCommentEntity], { nullable: true })
  comments: PostCommentEntity[];
}
