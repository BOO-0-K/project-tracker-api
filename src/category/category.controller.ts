import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/_entities/user.entity';
import { CategoryRequestDto } from './dto/category.request.dto';
import {
  CategoryAddResponseDto,
  CategoryDeleteResponseDto,
  CategoryIdDto,
  CategoryListDto,
  CategoryListResponseDto,
  CategoryUpdateResponseDto,
} from './dto/category.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';
import { Token } from 'src/_commons/auth/token.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 카테고리 추가
   * @param user UserEntity
   * @param categoryRequestDto CategoryRequestDto
   * @returns CategoryAddResponseDto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addCategory(
    @Token() user: UserEntity,
    @Body(ValidationPipe) categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryAddResponseDto> {
    const categoryId: CategoryIdDto = await this.categoryService.addCategory(
      +user.id,
      categoryRequestDto,
    );
    return {
      statusCode: 201,
      message: CustomHttpSuccess['ADD_CATEGORY_SUCCESS'],
      data: categoryId,
    };
  }

  /**
   * 카테고리 리스트
   * @param user UserEntity
   * @returns CategoryListResponseDto
   */
  @Get()
  @UseGuards(AuthGuard())
  async getCategories(@Token() user: UserEntity): Promise<CategoryListResponseDto> {
    const categories: CategoryListDto = await this.categoryService.getCategories(+user.id);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_CATEGORIES_SUCCESS'],
      data: categories,
    };
  }

  /**
   * 카테고리 수정
   * @param user UserEntity
   * @param id string
   * @param categoryRequestDto CategoryRequestDto
   * @returns CategoryUpdateResponseDto
   */
  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateCategory(
    @Token() user: UserEntity,
    @Param('id') id: string,
    @Body(ValidationPipe) categoryRequestDto: CategoryRequestDto,
  ): Promise<CategoryUpdateResponseDto> {
    await this.categoryService.updateCategory(+user.id, +id, categoryRequestDto);

    return {
      statusCode: 200,
      message: CustomHttpSuccess['UPDATE_CATEGORY_SUCCESS'],
    };
  }

  /**
   * 카테고리 삭제
   * @param user UserEntity
   * @param id string
   * @returns CategoryDeleteResponseDto
   */
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteCategory(
    @Token() user: UserEntity,
    @Param('id') id: string,
  ): Promise<CategoryDeleteResponseDto> {
    await this.categoryService.deleteCategory(+user.id, +id);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['DELETE_CATEGORY_SUCCESS'],
    };
  }
}
