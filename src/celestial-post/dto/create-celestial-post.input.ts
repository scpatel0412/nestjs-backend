import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCelestialPostDto {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  imageLink: string;

  @Field(() => String)
  slug: string;
}
