import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePokemonDto } from './dto/add-pokemon.dto';

@InputType()
export class UpdatePokemonInput extends PartialType(CreatePokemonDto) {
  // @Field(() => String)
  // id: string;
  @Field(() => String)
  name?: string;
  @Field(() => String)
  type?: string;
  @Field(() => Int)
  pokedex?: number;
}
