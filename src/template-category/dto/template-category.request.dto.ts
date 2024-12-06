import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class TemplateCategoryIdsDto {
  @IsString()
  templateCategoryIds: string; //TemplateCategoryIds
}

export class TemplateCategoryCopyRequestDto {
  @IsDateString()
  @IsNotEmpty()
  today: string; //오늘날짜
}
