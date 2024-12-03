import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

//회원가입 Request
export class SignupRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  email: string; //이메일

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9]*/, {
    message: 'password only accepts english and number',
  })
  password: string; //패스워드
}

//로그인 Request
export class SigninRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  email: string; //이메일

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9]*/, {
    message: 'password only accepts english and number',
  })
  password: string; //패스워드
}
