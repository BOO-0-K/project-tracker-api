import { Body, Controller, Get, HttpCode, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SigninRequestDto, SignupRequestDto } from './dto/user.request.dto';
import {
  AccessTokenDto,
  MeResponseDto,
  SigninResponseDto,
  SignupResponseDto,
} from './dto/user.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/_entities/user.entity';
import { Token } from 'src/_commons/auth/token.decorator';

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
    const accessToken: AccessTokenDto = await this.userService.signup(signupRequestDto);
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
    const accessToken: AccessTokenDto = await this.userService.signin(signinRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['SIGNIN_SUCCESS'],
      data: accessToken,
    };
  }

  /**
   * 내 정보 보기
   * @param user UserEntity
   * @returns MeResponseDto
   */
  @Get('/me')
  @UseGuards(AuthGuard())
  async getMyInfo(@Token() user: UserEntity): Promise<MeResponseDto> {
    const email = await this.userService.getMyInfo(user);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_MY_INFO_SUCCESS'],
      data: email,
    };
  }
}
