import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TemplateCategoryController } from './template-category.controller';
import { TemplateCategoryService } from './template-category.service';
import { TemplateCategoryRepository } from 'src/_repositories/template-category.repository';
import { TemplateRepository } from 'src/_repositories/template.repository';
import { CategoryRepository } from 'src/_repositories/category.repository';
import { TodoRepository } from 'src/_repositories/todo.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TemplateCategoryController],
  providers: [
    TemplateCategoryService,
    TemplateCategoryRepository,
    TemplateRepository,
    CategoryRepository,
    TodoRepository,
  ],
})
export class TemplateCategoryModule {}
