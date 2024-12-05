import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from 'src/_repositories/todo.repository';
import { CategoryRepository } from 'src/_repositories/category.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, CategoryRepository],
})
export class TodoModule {}
