import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/_repositories/category.repository';
import { TodoRepository } from 'src/_repositories/todo.repository';
import { CategoryIdRequestDto, TodoRequestDto } from './dto/todo.request.dto';
import { TodoDto, TodoIdDto, TodoListDto } from './dto/todo.response.dto';
import { CategoryEntity } from 'src/_entities/category.entity';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { TodoEntity } from 'src/_entities/todo.entity';

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

  /**
   * ToDo 리스트
   * @param userId number
   * @param categoryIdRequestDto CategoryIdRequestDto
   * @returns TodoListDto
   */
  async getTodos(userId: number, categoryIdRequestDto: CategoryIdRequestDto): Promise<TodoListDto> {
    const categoryId: number = categoryIdRequestDto.categoryId;

    //카테고리 접근 권한 체크
    const categoryAccess: CategoryEntity = await this.categoryRepository.checkCategoryAccess(
      userId,
      categoryId,
    );
    if (!categoryAccess) {
      throw new HttpException(CustomHttpException['FORBIDDEN_CATEGORY'], HttpStatus.FORBIDDEN);
    }

    const todos: Array<TodoDto> = await this.todoRepository.findAllTodos(userId, categoryId);

    return { todos: todos };
  }

  /**
   * ToDo 수정
   * @param userId number
   * @param id number
   * @param todoRequestDto ToDoRequestDto
   * @returns
   */
  async updateTodo(userId: number, id: number, todoRequestDto: TodoRequestDto): Promise<void> {
    const categoryId: number = todoRequestDto['categoryId'];

    //카테고리 접근 권한 체크
    const categoryAccess: CategoryEntity = await this.categoryRepository.checkCategoryAccess(
      userId,
      categoryId,
    );
    if (!categoryAccess) {
      throw new HttpException(CustomHttpException['FORBIDDEN_CATEGORY'], HttpStatus.FORBIDDEN);
    }

    //투두 접근 권한 체크
    const todo: TodoEntity = await this.todoRepository.checkTodoAccess(userId, id);
    if (!todo) {
      throw new HttpException(CustomHttpException['FORBIDDEN_TODO'], HttpStatus.FORBIDDEN);
    }

    await this.todoRepository.updateTodo(id, todoRequestDto);
  }

  /**
   * ToDo 삭제
   * @param userId number
   * @param id number
   * @returns
   */
  async deleteTodo(userId: number, id: number): Promise<void> {
    //투두 접근 권한 체크
    const todo: TodoEntity = await this.todoRepository.checkTodoAccess(userId, id);
    if (!todo) {
      throw new HttpException(CustomHttpException['FORBIDDEN_TODO'], HttpStatus.FORBIDDEN);
    }

    await this.todoRepository.deleteTodo(id);
  }
}
