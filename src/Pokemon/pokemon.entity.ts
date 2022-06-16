import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pokemon')
@ObjectType()
export class PokemonEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column('varchar', { length: 500, unique: true })
  @Field(() => String)
  name: string;

  @Column('varchar', { length: 500 })
  @Field(() => String)
  type: string;

  @Column('int')
  @Field(() => Int)
  pokedex: number;
}
