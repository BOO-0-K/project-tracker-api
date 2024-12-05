import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { TodoEntity } from 'src/_entities/todo.entity';
import { TodoRequestDto } from 'src/todo/dto/todo.request.dto';
import { TodoDto } from 'src/todo/dto/todo.response.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(private dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager());
  }

  //ToDo 추가
  async createTodo(todoRequestDto: TodoRequestDto): Promise<number> {
    try {
      const todoId = await this.insert(todoRequestDto);
      return todoId.identifiers[0].id;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //모든 ToDo 리스트 조회
  async findAllTodos(userId: number, categoryId: number): Promise<Array<TodoDto>> {
    try {
      const todos = await this.find({
        where: { userId: userId, categoryId: categoryId },
        relations: ['category'],
        order: {
          createdAt: 'ASC',
        },
      });

      const result: Array<TodoDto> = await todos.map((todo) => {
        return {
          id: todo.id,
          categoryId: todo.categoryId,
          status: todo.status,
          memo: todo.memo,
          today: todo.today.toString(),
          categoryName: todo.category?.name,
          createdAt: todo.createdAt,
        };
      });

      return result;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
