import { CreateCelestialPostDto } from './create-celestial-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCelestialPostInput extends PartialType(
  CreateCelestialPostDto,
) {
  @Field(() => String)
  id: string;
}
