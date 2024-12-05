//ToDo 아이디
export class TodoIdDto {
  readonly id: number;
}

//ToDo 추가 Response
export class TodoAddResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//ToDo
export class TodoDto {
  readonly id: number;
  readonly categoryId: number;
  readonly status: string;
  readonly memo: string;
  readonly today: string;
  readonly categoryName: string;
  readonly createdAt: Date;
}

//ToDo 리스트
export class TodoListDto {
  readonly todos: Array<TodoDto>;
}

//ToDo 리스트 Response
export class TodoListResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//ToDo 수정 Response
export class TodoUpdateResponseDto {
  readonly statusCode: number;
  readonly message: string;
}
