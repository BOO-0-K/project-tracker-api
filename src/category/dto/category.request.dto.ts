import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CategoryRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string; //카테고리명
}
