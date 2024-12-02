import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupRequestDto } from './dto/user.request.dto';
import { AccessTokenDto, SignupResponseDto } from './dto/user.response.dto';
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
      message: CustomHttpSuccess['SIGNIN_SUCCESS'],
      data: accessToken,
    };
  }
}
