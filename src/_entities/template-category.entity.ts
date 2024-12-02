import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TemplateEntity } from './template.entity';
import { CategoryEntity } from './category.entity';

@Entity('template_categories')
export class TemplateCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column()
  templateId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TemplateEntity, (template) => template.templateCategory, {
    onDelete: 'CASCADE',
  })
  template: TemplateEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.templateCategory, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
}
