import { ApiProperty } from '@nestjs/swagger';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';

//ToDo 아이디
export class TodoIdDto {
  @ApiProperty({
    example: 1,
    description: '아이디',
  })
  readonly id: number;
}

//ToDo 추가 Response
export class TodoAddResponseDto {
  @ApiProperty({
    example: 201,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess['ADD_TODO_SUCCESS'],
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: TodoIdDto,
  })
  readonly data: object;
}

//ToDo
export class TodoDto {
  @ApiProperty({
    example: 1,
    description: '아이디',
  })
  readonly id: number;

  @ApiProperty({
    example: 1,
    description: '카테고리 아이디',
  })
  readonly categoryId: number;

  @ApiProperty({
    enum: ['TODO', 'DOING', 'DONE'],
    description: '상태',
  })
  readonly status: string;

  @ApiProperty({
    example: '투두 내용',
    description: '투두 내용',
  })
  readonly memo: string;

  @ApiProperty({
    example: '2024-12-05',
    description: '투두 날짜',
  })
  readonly today: string;

  @ApiProperty({
    example: '카테고리1',
    description: '카테고리 이름',
  })
  readonly categoryName: string;

  @ApiProperty({
    example: '2024-12-05T04:34:42.288Z',
    description: '생성 날짜',
  })
  readonly createdAt: Date;
}

//ToDo 리스트
export class TodoListDto {
  @ApiProperty({
    type: [TodoDto],
  })
  readonly todos: Array<TodoDto>;
}

//ToDo 리스트 Response
export class TodoListResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess['GET_TODOS_SUCCESS'],
    description: '메시지',
  })
  readonly message: string;

  @ApiProperty({
    type: TodoListDto,
  })
  readonly data: object;
}

//ToDo 수정 Response
export class TodoUpdateResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess['UPDATE_TODO_SUCCESS'],
    description: '메시지',
  })
  readonly message: string;
}

//ToDo 삭제 Response
export class TodoDeleteResponseDto {
  @ApiProperty({
    example: 200,
    description: '상태코드',
  })
  readonly statusCode: number;

  @ApiProperty({
    example: CustomHttpSuccess['DELETE_TODO_SUCCESS'],
    description: '메시지',
  })
  readonly message: string;
}
