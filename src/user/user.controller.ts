import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import {
  AccessTokenDto,
  SigninResponseDto,
  SignupResponseDto,
} from './dto/user.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 회원가입
   * @param signupRequestDto SignupRequestDto
   * @returns SignupResponseDto
   */
  @Post('/signup')
  async signup(
    @Body(ValidationPipe) signupRequestDto: SignupRequestDto,
  ): Promise<SignupResponseDto> {
    const accessToken: AccessTokenDto =
      await this.userService.signup(signupRequestDto);
    return {
      statusCode: 201,
      message: CustomHttpSuccess['SIGNUP_SUCCESS'],
      data: accessToken,
    };
  }

  /**
   * 로그인
   * @param signinRequestDto SigninRequestDto
   * @returns SigninResponseDto
   */
  @HttpCode(200)
  @Post('/signin')
  async signin(
    @Body(ValidationPipe) signinRequestDto: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    const accessToken: AccessTokenDto =
      await this.userService.signin(signinRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['SIGNIN_SUCCESS'],
      data: accessToken,
    };
  }
}
