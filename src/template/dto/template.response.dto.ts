//템플릿 ID
export class TemplateIdDto {
  readonly id: number;
}

//템플릿 추가 Response
export class TemplateAddResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
