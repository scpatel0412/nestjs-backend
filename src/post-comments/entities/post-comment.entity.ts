import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CelestialPost } from 'src/celestial-post/entities/celestial-post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('postComments')
@ObjectType()
export class PostCommentEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('varchar')
  @Field(() => String)
  userId: string;

  @Column('varchar')
  @Field(() => String)
  userName: string;

  @Column('varchar')
  @Field(() => String)
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CelestialPost, (posts: CelestialPost) => posts.comments)
  @Field(() => CelestialPost, { nullable: true })
  posts: CelestialPost;

  @Field(() => String)
  postsId: string;
}
