import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class TemplateCategoryIdsDto {
  @IsString()
  @ApiProperty({
    example: '[1, 2]',
    description: '템플릿 카테고리 ids',
    required: true,
  })
  templateCategoryIds: string; //TemplateCategoryIds
}

export class TemplateCategoryCopyRequestDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-12-05',
    description: '오늘 날짜',
    required: true,
  })
  today: string; //오늘날짜
}
