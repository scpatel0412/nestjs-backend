import { ObjectType, Int, Field } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
@ObjectType()
export class CelestialPostModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  imageLink: string;

  @Field(() => String)
  slug: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
