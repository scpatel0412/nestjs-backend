import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PokemonModule } from './Pokemon/pokemon.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CelestialPostModule } from './celestial-post/celestial-post.module';
import { PostCommentsModule } from './post-comments/post-comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      replication: {
        master: {
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'nestjs',
        },
        slaves: [
          {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'nestjs',
          },
        ],
      },
      // entities: [PokemonEntity],
      autoLoadEntities: true,
      // migrations: ['migrations/*{.ts,.js}'],
      // migrationsTableName: 'migrations_typeorm',
      // migrationsRun: true,
      // migrations: ['../src/migrations/*.ts'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      playground: true,
      path: '/',
      driver: ApolloDriver,
    }),
    PokemonModule,
    UserModule,
    AuthModule,
    CelestialPostModule,
    PostCommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
