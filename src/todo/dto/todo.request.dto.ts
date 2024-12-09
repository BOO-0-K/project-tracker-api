import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TodoRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '아이디',
    required: true,
  })
  categoryId: number; //카테고리 아이디

  @IsString()
  @IsNotEmpty()
  @IsIn(['TODO', 'DOING', 'DONE'], {
    message: 'status는 TODO, DOING, DONE만 가능합니다.',
  })
  @MaxLength(10)
  @ApiProperty({
    enum: ['TODO', 'DOING', 'DONE'],
    description: '상태',
    required: true,
  })
  status: string; //상태

  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    example: '투두 내용',
    description: '투두 내용',
    required: false,
  })
  memo: string; //메모

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-12-05',
    description: '투두 날짜',
    required: true,
  })
  today: string; //투두 날짜
}

export class CategoryIdRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: '아이디',
    required: true,
  })
  categoryId: number; // 카테고리 아이디
}
