import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { CategoryEntity } from 'src/_entities/category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(private dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  //카테고리 이름 중복 체크
  async findCategoryByName(userId: number, name: string): Promise<CategoryEntity> {
    try {
      const category: CategoryEntity = await this.findOne({
        where: { userId: userId, name: name },
      });

      return category;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //카테고리 추가
  async createCategory(userId: number, name: string): Promise<number> {
    try {
      const category = await this.insert({ userId: userId, name: name });
      return category.identifiers[0].id;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
