import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { CategoryEntity } from 'src/_entities/category.entity';
import { CategoryRequestDto } from 'src/category/dto/category.request.dto';
import { CategoryDto } from 'src/category/dto/category.response.dto';
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

  //카테고리 접근 권한 체크
  async checkCategoryAccess(userId: number, id: number): Promise<CategoryEntity> {
    try {
      const category: CategoryEntity = await this.findOne({
        where: {
          userId: userId,
          id: id,
        },
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

  //모든 카테고리 리스트 조회
  async findAllCategories(userId: number): Promise<Array<CategoryDto>> {
    try {
      const categories: Array<CategoryDto> = await this.find({
        where: { userId: userId },
        order: {
          createdAt: 'ASC',
        },
        select: ['id', 'name'],
      });

      return categories;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //카테고리 수정
  async updateCategory(id: number, categoryRequestDto: CategoryRequestDto): Promise<void> {
    try {
      await this.update(id, categoryRequestDto);
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //카테고리 삭제
  async deleteCategory(id: number): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
