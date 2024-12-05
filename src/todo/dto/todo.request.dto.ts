import { IsDateString, IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TodoRequestDto {
  @IsNotEmpty()
  categoryId: number; //카테고리 아이디

  @IsString()
  @IsNotEmpty()
  @IsIn(['TODO', 'DOING', 'DONE'], {
    message: 'status는 TODO, DOING, DONE만 가능합니다.',
  })
  @MaxLength(10)
  status: string; //상태

  @IsString()
  @MaxLength(1000)
  memo: string; //메모

  @IsDateString()
  @IsNotEmpty()
  today: string; //투두 날짜
}

export class CategoryIdRequestDto {
  @IsNotEmpty()
  categoryId: number; // 카테고리 아이디
}
