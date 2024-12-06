import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { AuthGuard } from '@nestjs/passport';
import { Token } from 'src/_commons/auth/token.decorator';
import { UserEntity } from 'src/_entities/user.entity';
import { TemplateRequestDto } from './dto/template.request.dto';
import {
  TemplateAddResponseDto,
  TemplateIdDto,
  TemplateListDto,
  TemplateListResponseDto,
  TemplateUpdateResponseDto,
} from './dto/template.response.dto';
import { CustomHttpSuccess } from 'src/_commons/constants/http-success.constants';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  /**
   * 템플릿 추가
   * @param user UserEntity
   * @param templateRequestDto TemplateRequestDto
   * @returns TemplateAddResponseDto
   */
  @Post()
  @UseGuards(AuthGuard())
  async addTemplate(
    @Token() user: UserEntity,
    @Body(ValidationPipe) templateRequestDto: TemplateRequestDto,
  ): Promise<TemplateAddResponseDto> {
    const templateId: TemplateIdDto = await this.templateService.addTemplate(
      +user.id,
      templateRequestDto,
    );
    return {
      statusCode: 201,
      message: CustomHttpSuccess['ADD_TEMPLATE_SUCCESS'],
      data: templateId,
    };
  }

  /**
   * 템플릿 리스트
   * @param user UserEntity
   * @returns TemplateListResponseDto
   */
  @Get()
  @UseGuards(AuthGuard())
  async getTemplates(@Token() user: UserEntity): Promise<TemplateListResponseDto> {
    const templates: TemplateListDto = await this.templateService.getTemplates(+user.id);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['GET_TEMPLATES_SUCCESS'],
      data: templates,
    };
  }

  /**
   * 템플릿 수정
   * @param user UserEntity
   * @param id string
   * @param templateRequestDto TemplateRequestDto
   * @returns TemplateUpdateResponseDto
   */
  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateTemplate(
    @Token() user: UserEntity,
    @Param('id') id: string,
    @Body(ValidationPipe) templateRequestDto: TemplateRequestDto,
  ): Promise<TemplateUpdateResponseDto> {
    await this.templateService.updateTemplate(+user.id, +id, templateRequestDto);
    return {
      statusCode: 200,
      message: CustomHttpSuccess['UPDATE_TEMPLATE_SUCCESS'],
    };
  }
}
