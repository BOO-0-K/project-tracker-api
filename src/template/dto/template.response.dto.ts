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

//템플릿
export class TemplateDto {
  readonly id: number;
  readonly name: string;
}

//템플릿 리스트
export class TemplateListDto {
  readonly templates: Array<TemplateDto>;
}

//팀플릿 리스트 Response
export class TemplateListResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
