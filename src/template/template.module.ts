import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TemplateRepository } from 'src/_repositories/template.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository],
})
export class TemplateModule {}
