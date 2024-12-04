//카테고리 ID
export class CategoryIdDto {
  readonly id: number;
}

//카테고리 추가 Response
export class CategoryAddResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
