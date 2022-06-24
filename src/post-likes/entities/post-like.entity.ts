import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CelestialPost } from 'src/celestial-post/entities/celestial-post.entity';

@Entity('postLikes')
@ObjectType()
export class PostLikeEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('varchar')
  @Field(() => String)
  userId: string;

  @Column('varchar')
  @Field(() => String)
  userName: string;

  @Column('boolean')
  @Field(() => Boolean)
  like: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CelestialPost, (posts: CelestialPost) => posts.likes)
  @Field(() => CelestialPost, { nullable: true })
  posts: CelestialPost;
}
