import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PokemonEntity } from './pokemon.entity';
import { CreatePokemonDto } from './dto/add-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { inputPokemon } from './input/pokemon.input';
import { UpdatePokemonInput } from './update-pokemon.input';

@Resolver((of) => PokemonEntity)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query((returns) => [CreatePokemonDto])
  async pokemon() {
    return this.pokemonService.getPokemons();
  }

  @Query((returns) => CreatePokemonDto)
  async getPokemon(@Args('id', { type: () => String }) id: string) {
    return this.pokemonService.getPokemon(id);
  }

  @Mutation(() => CreatePokemonDto)
  async updatePokemon(
    @Args('id') id: string,
    @Args('updatePokemonInput') updatePokemonInput: UpdatePokemonInput,
  ) {
    return this.pokemonService.updatePokemon(id, updatePokemonInput);
  }
  @Mutation(() => CreatePokemonDto)
  async deletePokemon(@Args('id') id: string) {
    return this.pokemonService.deletePokemon(id);
  }

  @Mutation((returns) => CreatePokemonDto)
  async createPokemon(@Args('data') data: inputPokemon) {
    return this.pokemonService.createPokemon(data);
  }
}
