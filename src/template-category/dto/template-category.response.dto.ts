//템플릿 카테고리
export class TemplateCategoryDto {
  readonly id: number;
  readonly templateId: number;
  readonly categoryId: number;
  readonly categoryName: string;
  readonly createdAt: Date;
}

//템플릿 카테고리 추가 DTO
export class TemplateCategoryAddDto {
  readonly templateCategory: object;
}

//템플릿 카테고리 추가 Response
export class TemplateCategoryAddResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//템플릿 카테고리 리스트 DTO
export class TemplateCategoryListDto {
  readonly templateCategories: Array<TemplateCategoryDto>;
}

//템플릿 카테고리 리스트 Response
export class TemplateCategoryListResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//템플릿에서 카테고리 제거 Response
export class TemplateCategoryRemoveResponseDto {
  readonly statusCode: number;
  readonly message: string;
}

//템플릿 복사 Response
export class TemplateCategoryCopyResponseDto {
  readonly statusCode: number;
  readonly message: string;
}
