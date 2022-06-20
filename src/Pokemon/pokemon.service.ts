import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from './pokemon.entity';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/add-pokemon.dto';
import { UpdatePokemonInput } from './update-pokemon.input';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly PokemonRepository: Repository<PokemonEntity>,
  ) {}

  async createPokemon(data: CreatePokemonDto): Promise<PokemonEntity> {
    const pokemon = new PokemonEntity();
    pokemon.name = data.name;
    pokemon.pokedex = data.pokedex;
    pokemon.type = data.type;

    await this.PokemonRepository.save(pokemon);

    return pokemon;
  }
  async getPokemon(userId: string, id: any): Promise<PokemonEntity> {
    const user = await this.PokemonRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`${id} of this pokemon is not found`);
    }
    return user;
  }
  async updatePokemon(
    id: any,
    updatePokemonInput: UpdatePokemonInput,
  ): Promise<PokemonEntity> {
    const user = await this.PokemonRepository.preload({
      id: id,
      ...updatePokemonInput,
    });
    if (!user) {
      throw new NotFoundException(`Pokemon with ${id} not Found`);
    }
    return this.PokemonRepository.save(user);
  }

  async getPokemons(): Promise<Array<PokemonEntity>> {
    return await this.PokemonRepository.find();
  }
  async deletePokemon(id: string): Promise<PokemonEntity> {
    const pokemon = await this.PokemonRepository.findOne({ where: { id } });
    if (pokemon) {
      await this.PokemonRepository.remove(pokemon);
      return {
        id: id,
        name: '',
        type: '',
        pokedex: 0,
      };
    } else {
      throw new NotFoundException(`Pokemon with ${id} cannot be found`);
    }
  }
}
