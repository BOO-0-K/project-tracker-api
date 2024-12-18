import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './_commons/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './_configs/typeorm.config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TodoModule } from './todo/todo.module';
import { TemplateModule } from './template/template.module';
import { TemplateCategoryModule } from './template-category/template-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    CategoryModule,
    TodoModule,
    TemplateModule,
    TemplateCategoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
