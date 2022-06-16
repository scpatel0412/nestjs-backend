import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class inputPokemon {
  @Field(() => String) name: string;
  @Field(() => String) type: string;
  @Field(() => Int) pokedex: number;
}
