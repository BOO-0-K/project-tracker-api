import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/_repositories/category.repository';
import { CategoryRequestDto } from './dto/category.request.dto';
import { CategoryDto, CategoryIdDto, CategoryListDto } from './dto/category.response.dto';
import { CategoryEntity } from 'src/_entities/category.entity';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  /**
   * 카테고리 추가
   * @param categoryRequestDto CategoryRequestDto
   * @returns CategoryIdDto
   */
  async addCategory(
    userId: number,
    categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryIdDto> {
    const name: string = categoryRequestDto['name'];

    //카테고리 이름 중복 체크
    const categoryName: CategoryEntity = await this.categoryRepository.findCategoryByName(
      userId,
      name,
    );
    if (categoryName) {
      throw new HttpException(CustomHttpException['CONFLICT_CATEGORY'], HttpStatus.CONFLICT);
    }

    //카테고리 추가
    const categoryId: number = await this.categoryRepository.createCategory(userId, name);
    return { id: categoryId };
  }

  /**
   * 카테고리 리스트
   * @param userId number
   * @returns CategoryListDto
   */
  async getCategories(userId: number): Promise<CategoryListDto> {
    const categories: Array<CategoryDto> = await this.categoryRepository.findAllCategories(userId);
    return { categories: categories };
  }
}
