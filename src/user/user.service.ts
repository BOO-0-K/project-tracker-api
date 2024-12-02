import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'src/_repositories/user.repository';
import { SignupRequestDto } from './dto/user.request.dto';
import { AccessTokenDto } from './dto/user.response.dto';
import { UserEntity } from 'src/_entities/user.entity';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * 회원가입
   * @param signupRequestDto SignupRequestDto
   * @returns AccessTokenDto
   */
  async signup(signupRequestDto: SignupRequestDto): Promise<AccessTokenDto> {
    const { email, password } = signupRequestDto;

    //이메일로 회원 찾기
    const user: UserEntity = await this.userRepository.findByEmail(email);
    if (user) {
      throw new HttpException(
        CustomHttpException['CONFLICT_EMAIL'],
        HttpStatus.CONFLICT,
      );
    }

    //회원 생성
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userRepository.createUser(email, hashedPassword);

    //JWT 토큰 생성
    const payload = { email };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
