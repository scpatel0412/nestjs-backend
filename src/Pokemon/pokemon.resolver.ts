import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PokemonEntity } from './pokemon.entity';
import { CreatePokemonDto } from './dto/add-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { inputPokemon } from './input/pokemon.input';
import { UpdatePokemonInput } from './update-pokemon.input';
import { GqlAuthId } from 'src/auth/decorators/gql-auth-id.decorator';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver((of) => PokemonEntity)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @AllowUnauthorized()
  @Query((returns) => [CreatePokemonDto])
  async pokemon() {
    return this.pokemonService.getPokemons();
  }

  @Query((returns) => CreatePokemonDto)
  async getPokemon(
    @GqlAuthId() userId: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.pokemonService.getPokemon(userId, id);
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
