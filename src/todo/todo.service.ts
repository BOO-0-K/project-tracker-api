import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/_repositories/category.repository';
import { TodoRepository } from 'src/_repositories/todo.repository';
import { TodoRequestDto } from './dto/todo.request.dto';
import { TodoIdDto } from './dto/todo.response.dto';
import { CategoryEntity } from 'src/_entities/category.entity';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';

@Injectable()
export class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  /**
   * ToDo 추가
   * @param userId number
   * @param todoRequestDto TodoRequestDto
   * @returns TodoIdDto
   */
  async addTodo(userId: number, todoRequestDto: TodoRequestDto): Promise<TodoIdDto> {
    const categoryId: number = todoRequestDto['categoryId'];

    //카테고리 접근 권한 체크
    const categoryAccess: CategoryEntity = await this.categoryRepository.checkCategoryAccess(
      userId,
      categoryId,
    );
    if (!categoryAccess) {
      throw new HttpException(CustomHttpException['FORBIDDEN_CATEGORY'], HttpStatus.FORBIDDEN);
    }

    todoRequestDto['userId'] = userId;
    const todoId: number = await this.todoRepository.createTodo(todoRequestDto);
    return { id: todoId };
  }
}
