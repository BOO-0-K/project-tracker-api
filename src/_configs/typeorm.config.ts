import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CategoryEntity } from 'src/entities/category.entity';
import { TemplateCategoryEntity } from 'src/entities/template-category.entity';
import { TemplateEntity } from 'src/entities/template.entity';
import { TodoEntity } from 'src/entities/todo.entity';
import { UserEntity } from 'src/entities/user.entity';
dotenv.config();

const entities = [
  UserEntity,
  CategoryEntity,
  TemplateEntity,
  TemplateCategoryEntity,
  TodoEntity,
];

export let typeORMConfig: TypeOrmModuleOptions;
if (process.env.NODE_ENV === 'dev') {
  // dev
  console.log('DB 연결 성공...✅');
  typeORMConfig = {
    type: 'mysql',
    host: process.env.DEV_DB_HOST,
    port: 3306,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    entities: entities,
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    keepConnectionAlive: true,
    timezone: '+09:00',
  };
} else if (process.env.NODE_ENV === 'test') {
  // test
  console.log('DB 연결 성공...✅');
  typeORMConfig = {
    type: 'mysql',
    host: process.env.TEST_DB_HOST,
    port: 3306,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    entities: entities,
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    keepConnectionAlive: true,
    timezone: '+09:00',
  };
} else {
  // prod
  console.log('DB 연결 성공...✅');
  typeORMConfig = {
    type: 'mysql',
    host: process.env.PROD_DB_HOST,
    port: 3306,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    entities: entities,
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
    keepConnectionAlive: true,
    timezone: '+09:00',
  };
}
