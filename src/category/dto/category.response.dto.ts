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

//카테고리
export class CategoryDto {
  readonly id: number;
  readonly name: string;
}

//카테고리 리스트
export class CategoryListDto {
  readonly categories: Array<CategoryDto>;
}

//카테고리 리스트 Response
export class CategoryListResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//카테고리 수정 Response
export class CategoryUpdateResponseDto {
  readonly statusCode: number;
  readonly message: string;
}

//카테고리 삭제 Response
export class CategoryDeleteResponseDto {
  readonly statusCode: number;
  readonly message: string;
}
