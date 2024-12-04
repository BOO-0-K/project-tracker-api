import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from 'src/_repositories/category.repository';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
