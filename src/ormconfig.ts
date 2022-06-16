import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'root',
  port: 5432,
  host: 'localhost',
  database: 'nestjs',
  autoLoadEntities: true,
  logging: true,
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

module.exports = typeOrmConfig;
