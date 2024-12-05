import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/_commons/auth/token.decorator';
import { UserEntity } from 'src/_entities/user.entity';
import { CategoryIdRequestDto, TodoRequestDto } from './dto/todo.request.dto';
import {
  TodoAddResponseDto,
  TodoIdDto,
  TodoListDto,
  TodoListResponseDto,
} from './dto/todo.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * ToDo 추가
   * @param user UserEntity
   * @param todoRequestDto TodoRequestDto
   * @returns TodoAddResponseDto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addTodo(
    @Token() user: UserEntity,
    @Body(ValidationPipe) todoRequestDto: TodoRequestDto,
  ): Promise<TodoAddResponseDto> {
    const todoId: TodoIdDto = await this.todoService.addTodo(+user.id, todoRequestDto);
    return {
      statusCode: 201,
      message: CustomHttpSuccess['ADD_TODO_SUCCESS'],
      data: todoId,
    };
  }

  /**
   * ToDo 리스트
   * @param user UserEntity
   * @param categoryIdRequestDto CategoryIdRequestDto
   * @returns TodoListResponseDto
   */
  @Get()
  @UseGuards(AuthGuard())
  async getTodos(
    @Token() user: UserEntity,
    @Query(ValidationPipe) categoryIdRequestDto: CategoryIdRequestDto,
  ): Promise<TodoListResponseDto> {
    const todos: TodoListDto = await this.todoService.getTodos(+user.id, categoryIdRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_TODOS_SUCCESS'],
      data: todos,
    };
  }
}
