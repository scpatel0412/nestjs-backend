import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatePokemonDto {
  @Field(() => String) id?: string;
  @Field(() => String) name: string;
  @Field(() => String) type: string;
  @Field(() => Int) pokedex: number;
}
