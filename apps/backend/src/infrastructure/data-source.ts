import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as loadEnv } from 'dotenv';

loadEnv();

/**
 * Opciones compartidas entre la app Nest y el CLI de TypeORM
 * (migrations:generate / migrations:run).
 */
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  username: process.env.MYSQL_USER || 'apex_user',
  password: process.env.MYSQL_PASSWORD || 'apex_password',
  database: process.env.MYSQL_DATABASE || 'apex_db',
  entities: [__dirname + '/../adapters/outbound/*.orm-entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  // El esquema se versiona con migraciones, nunca por sincronización automática.
  synchronize: false,
  migrationsRun: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
};

export default new DataSource(dataSourceOptions);
