//Access Token
export class AccessTokenDto {
  readonly accessToken: string;
}

//회원가입 Response
export class SignupResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}

//로그인 Response
export class SigninResponseDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
