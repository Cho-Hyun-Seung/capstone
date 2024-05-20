import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { ConfigService } from '@nestjs/config';

// const dbConfig = config.get('db')
// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'toki0327',
//   database: 'graduation',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };
export const typeORMConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    timezone: '+09:00',
    // logging: true,
  };
  return options;
};
