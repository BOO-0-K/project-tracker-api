import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { UserEntity } from 'src/_entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  //이메일로 회원 찾기
  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.findOne({
        where: { email },
        select: ['id', 'email', 'password'],
      });

      return user;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //회원 생성
  async createUser(email: string, password: string): Promise<void> {
    try {
      await this.insert({
        email,
        password,
      });
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
