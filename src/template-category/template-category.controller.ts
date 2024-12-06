import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TemplateCategoryService } from './template-category.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/_commons/auth/token.decorator';
import { UserEntity } from 'src/_entities/user.entity';
import {
  TemplateCategoryAddDto,
  TemplateCategoryAddResponseDto,
  TemplateCategoryCopyResponseDto,
  TemplateCategoryListDto,
  TemplateCategoryListResponseDto,
  TemplateCategoryRemoveResponseDto,
} from './dto/template-category.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';
import {
  TemplateCategoryCopyRequestDto,
  TemplateCategoryIdsDto,
} from './dto/template-category.request.dto';

@Controller('templates')
export class TemplateCategoryController {
  constructor(private readonly templateCategoryService: TemplateCategoryService) {}

  /**
   * 템플릿에 카테고리 추가
   * @param user UserEntity
   * @param templateId string
   * @param categoryId string
   * @returns TemplateCategoryAddResponseDto
   */
  @Post(':templateId/categories/:categoryId')
  @UseGuards(AuthGuard())
  async addCategoryToTemplate(
    @Token() user: UserEntity,
    @Param('templateId') templateId: string,
    @Param('categoryId') categoryId: string,
  ): Promise<TemplateCategoryAddResponseDto> {
    const templateCategory: TemplateCategoryAddDto =
      await this.templateCategoryService.addCategoryToTemplate(+user.id, +templateId, +categoryId);
    return {
      statusCode: 201,
      message: CustomHttpSuccess['ADD_CATEGORY_TO_TEMPLATE_SUCCESS'],
      data: templateCategory,
    };
  }

  /**
   * 모든 템플릿 카테고리 리스트
   * @param user UserEntity
   * @returns TemplateCategoryListResponseDto
   */
  @Get('/categories')
  @UseGuards(AuthGuard())
  async getTemplateCategories(@Token() user: UserEntity): Promise<TemplateCategoryListResponseDto> {
    const templateCategories: TemplateCategoryListDto =
      await this.templateCategoryService.getTemplateCategories(+user.id);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_TEMPLATE_CATEGORIES_SUCCESS'],
      data: templateCategories,
    };
  }

  /**
   * 템플릿에서 카테고리 제거
   * @param user UserEntity
   * @param templateId string
   * @param templateCategoryIdsDto TemplateCategoryIdsDto
   * @returns TemplateCategoryRemoveResponseDto
   */
  @Delete(':templateId/categories')
  @UseGuards(AuthGuard())
  async removeCategoryFromTemplate(
    @Token() user: UserEntity,
    @Param('templateId') templateId: string,
    @Body(ValidationPipe) templateCategoryIdsDto: TemplateCategoryIdsDto,
  ): Promise<TemplateCategoryRemoveResponseDto> {
    const templateCategoryIds = JSON.parse(templateCategoryIdsDto.templateCategoryIds);

    await this.templateCategoryService.removeCategoryFromTemplate(
      +user.id,
      +templateId,
      templateCategoryIds,
    );
    return {
      statusCode: 200,
      message: CustomHttpSuccess['REMOVE_CATEGORY_FROM_TEMPLATE_SUCCESS'],
    };
  }

  /**
   * 템플릿 복사
   * @param user UserEntity
   * @param templateId string
   * @param templateCategoryCopyRequestDto TemplateCategoryCopyRequestDto
   * @returns TemplateCopyResponseDto
   */
  @Post(':templateId/todo-copy')
  @UseGuards(AuthGuard())
  async copyTemplate(
    @Token() user: UserEntity,
    @Param('templateId') templateId: string,
    @Body(ValidationPipe) templateCategoryCopyRequestDto: TemplateCategoryCopyRequestDto,
  ): Promise<TemplateCategoryCopyResponseDto> {
    await this.templateCategoryService.copyTemplate(
      +user.id,
      +templateId,
      templateCategoryCopyRequestDto,
    );
    return {
      statusCode: 200,
      message: CustomHttpSuccess['COPY_TEMPLATE_SUCCESS'],
    };
  }
}
