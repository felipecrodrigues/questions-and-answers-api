import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  maxQueryExecutionTime: 100,
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'migration_history',
  entities: ['src/domain/entities/*{.ts,.js}'],
  migrations: ['src/infra/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/domain/entities',
    migrationsDir: 'src/infra/migrations'
  },
};
