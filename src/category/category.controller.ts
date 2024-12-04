import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/_entities/user.entity';
import { CategoryRequestDto } from './dto/category.request.dto';
import { CategoryAddResponseDto, CategoryIdDto } from './dto/category.response.dto';
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
}
